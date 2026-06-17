import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type {
  ClubInfo, RecruitJob, ApplicationRecord, InterviewSlot,
  Member, ScheduleShift, Notification, ConfirmRecord
} from '@/types';
import { clubInfo as initClubInfo } from '@/data/club';
import { recruitJobs as initRecruitJobs, myApplications as initMyApplications } from '@/data/recruit';
import { members as initMembers } from '@/data/members';
import { scheduleShifts as initScheduleShifts } from '@/data/schedule';
import { notifications as initNotifications, confirmRecords as initConfirmRecords } from '@/data/notifications';

interface AppState {
  clubInfo: ClubInfo;
  recruitJobs: RecruitJob[];
  myApplications: ApplicationRecord[];
  members: Member[];
  scheduleShifts: ScheduleShift[];
  notifications: Notification[];
  confirmRecords: ConfirmRecord[];
  currentMember: Member;
}

type Action =
  | { type: 'UPDATE_CLUB_INFO'; payload: Partial<ClubInfo> }
  | { type: 'ADD_RECRUIT_JOB'; payload: RecruitJob }
  | { type: 'UPDATE_RECRUIT_JOB'; payload: RecruitJob }
  | { type: 'ADD_APPLICATION'; payload: ApplicationRecord }
  | { type: 'UPDATE_INTERVIEW_SLOT'; payload: { jobId: string; slotId: string; bookedCount: number } }
  | { type: 'CLAIM_SHIFT'; payload: { shiftId: string; member: { memberId: string; memberName: string; avatar: string } } }
  | { type: 'UPDATE_SHIFT_CONFLICT'; payload: { shiftId: string; hasConflict: boolean } }
  | { type: 'READ_NOTIFICATION'; payload: string }
  | { type: 'CONFIRM_NOTIFICATION'; payload: { notificationId: string; memberId: string } }
  | { type: 'LEAVE_NOTIFICATION'; payload: { notificationId: string; memberId: string; reason: string } }
  | { type: 'UPDATE_NOTIFICATION_STATS'; payload: { notificationId: string; stats: { readCount: number; leaveCount: number; unconfirmedCount: number } } }
  | { type: 'UPDATE_CONFIRM_RECORD'; payload: ConfirmRecord }
  | { type: 'ADD_CONFIRM_RECORD'; payload: ConfirmRecord };

const currentMember = initMembers[6];

const initialState: AppState = {
  clubInfo: initClubInfo,
  recruitJobs: initRecruitJobs,
  myApplications: initMyApplications,
  members: initMembers,
  scheduleShifts: initScheduleShifts,
  notifications: initNotifications,
  confirmRecords: initConfirmRecords,
  currentMember
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_CLUB_INFO':
      return { ...state, clubInfo: { ...state.clubInfo, ...action.payload } };

    case 'ADD_RECRUIT_JOB':
      return { ...state, recruitJobs: [...state.recruitJobs, action.payload] };

    case 'UPDATE_RECRUIT_JOB':
      return {
        ...state,
        recruitJobs: state.recruitJobs.map(j =>
          j.id === action.payload.id ? action.payload : j
        )
      };

    case 'ADD_APPLICATION':
      return {
        ...state,
        myApplications: [...state.myApplications, action.payload],
        recruitJobs: state.recruitJobs.map(j =>
          j.id === action.payload.jobId
            ? { ...j, appliedCount: j.appliedCount + 1 }
            : j
        )
      };

    case 'UPDATE_INTERVIEW_SLOT':
      return {
        ...state,
        recruitJobs: state.recruitJobs.map(j =>
          j.id === action.payload.jobId
            ? {
                ...j,
                interviewSlots: j.interviewSlots.map(s =>
                  s.id === action.payload.slotId
                    ? { ...s, bookedCount: action.payload.bookedCount }
                    : s
                )
              }
            : j
        )
      };

    case 'CLAIM_SHIFT': {
      const { shiftId, member } = action.payload;
      const currentMemberId = member.memberId;
      const targetShift = state.scheduleShifts.find(s => s.id === shiftId);
      if (!targetShift) return state;

      const alreadyAssigned = targetShift.assignedMembers.some(
        m => m.memberId === currentMemberId
      );
      if (alreadyAssigned) return state;

      const newMember: import('@/types').ShiftMember = {
        memberId: member.memberId,
        memberName: member.memberName,
        avatar: member.avatar,
        status: 'claimed' as const,
        isLeader: false
      };

      const updatedShifts = state.scheduleShifts.map(s => {
        if (s.id !== shiftId) return s;
        const newMembers = [...s.assignedMembers, newMember];
        const newConflict = checkShiftConflict(state.scheduleShifts, shiftId, currentMemberId);
        return {
          ...s,
          assignedMembers: newMembers,
          hasConflict: newConflict
        };
      });

      const allShiftsWithMember = updatedShifts.filter(s =>
        s.assignedMembers.some(m => m.memberId === currentMemberId)
      );

      const finalShifts = updatedShifts.map(s => {
        if (s.assignedMembers.some(m => m.memberId === currentMemberId)) return s;
        const hasConflictWithMember = allShiftsWithMember.some(ms =>
          ms.id !== s.id &&
          ms.date === s.date &&
          timeRangesOverlap(ms.startTime, ms.endTime, s.startTime, s.endTime)
        );
        return { ...s, hasConflict: s.hasConflict || hasConflictWithMember };
      });

      return { ...state, scheduleShifts: finalShifts };
    }

    case 'UPDATE_SHIFT_CONFLICT':
      return {
        ...state,
        scheduleShifts: state.scheduleShifts.map(s =>
          s.id === action.payload.shiftId
            ? { ...s, hasConflict: action.payload.hasConflict }
            : s
        )
      };

    case 'READ_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, isRead: true } : n
        )
      };

    case 'CONFIRM_NOTIFICATION': {
      const { notificationId, memberId } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map(n => {
          if (n.id !== notificationId) return n;
          const stats = {
            ...n.stats,
            readCount: n.stats.readCount + 1,
            unconfirmedCount: Math.max(0, n.stats.unconfirmedCount - 1)
          };
          return { ...n, stats };
        }),
        confirmRecords: state.confirmRecords.map(cr =>
          cr.notificationId === notificationId && cr.memberId === memberId
            ? { ...cr, status: 'read' as const, confirmTime: new Date().toLocaleString() }
            : cr
        )
      };
    }

    case 'LEAVE_NOTIFICATION': {
      const { notificationId, memberId, reason } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map(n => {
          if (n.id !== notificationId) return n;
          const stats = {
            ...n.stats,
            leaveCount: n.stats.leaveCount + 1,
            unconfirmedCount: Math.max(0, n.stats.unconfirmedCount - 1)
          };
          return { ...n, stats };
        }),
        confirmRecords: state.confirmRecords.map(cr =>
          cr.notificationId === notificationId && cr.memberId === memberId
            ? { ...cr, status: 'leave' as const, leaveReason: reason, confirmTime: new Date().toLocaleString() }
            : cr
        )
      };
    }

    case 'UPDATE_NOTIFICATION_STATS':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload.notificationId
            ? { ...n, stats: { ...n.stats, ...action.payload.stats } }
            : n
        )
      };

    case 'UPDATE_CONFIRM_RECORD':
      return {
        ...state,
        confirmRecords: state.confirmRecords.map(cr =>
          cr.id === action.payload.id ? action.payload : cr
        )
      };

    case 'ADD_CONFIRM_RECORD':
      return {
        ...state,
        confirmRecords: [...state.confirmRecords, action.payload]
      };

    default:
      return state;
  }
}

function timeRangesOverlap(
  start1: string, end1: string,
  start2: string, end2: string
): boolean {
  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const s1 = toMin(start1), e1 = toMin(end1);
  const s2 = toMin(start2), e2 = toMin(end2);
  return s1 < e2 && s2 < e1;
}

function checkShiftConflict(
  shifts: ScheduleShift[],
  targetShiftId: string,
  memberId: string
): boolean {
  const targetShift = shifts.find(s => s.id === targetShiftId);
  if (!targetShift) return false;

  return shifts.some(s => {
    if (s.id === targetShiftId) return false;
    if (!s.assignedMembers.some(m => m.memberId === memberId)) return false;
    if (s.date !== targetShift.date) return false;
    return timeRangesOverlap(s.startTime, s.endTime, targetShift.startTime, targetShift.endTime);
  });
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
