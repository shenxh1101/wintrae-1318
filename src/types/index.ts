// 社团信息
export interface ClubInfo {
  id: string;
  name: string;
  logo: string;
  description: string;
  slogan: string;
  memberCount: number;
  departmentCount: number;
  activityCount: number;
  establishDate: string;
  president: string;
  contact: string;
  departments: Department[];
}

// 部门
export interface Department {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  leader: string;
}

// 招聘岗位
export interface RecruitJob {
  id: string;
  title: string;
  department: string;
  departmentId: string;
  description: string;
  requirements: string[];
  benefits: string[];
  quota: number;
  appliedCount: number;
  status: 'recruiting' | 'closed';
  interviewSlots: InterviewSlot[];
  publishDate: string;
  deadline: string;
}

// 面试时段
export interface InterviewSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  bookedCount: number;
}

// 报名记录
export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  department: string;
  name: string;
  studentId: string;
  phone: string;
  email: string;
  grade: string;
  major: string;
  skills: string[];
  introduction: string;
  interviewSlotId?: string;
  interviewSlotInfo?: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview';
  submitDate: string;
  feedback?: string;
}

// 成员信息
export interface Member {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  department: string;
  departmentId: string;
  position: string;
  phone: string;
  email: string;
  grade: string;
  major: string;
  skills: string[];
  isActive: boolean;
  joinDate: string;
  duty: string;
}

// 活动
export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  coverImage: string;
  participantCount: number;
  maxParticipants: number;
}

// 排班岗位
export interface ScheduleShift {
  id: string;
  activityId: string;
  activityTitle: string;
  position: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  requiredCount: number;
  assignedMembers: ShiftMember[];
  description: string;
  hasConflict: boolean;
}

// 排班成员
export interface ShiftMember {
  memberId: string;
  memberName: string;
  avatar: string;
  status: 'assigned' | 'claimed' | 'pending';
  isLeader: boolean;
}

// 通知
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'activity' | 'recruit' | 'system' | 'schedule';
  publishDate: string;
  publisher: string;
  isRead: boolean;
  needConfirm: boolean;
  confirmDeadline?: string;
  stats: NotificationStats;
}

// 通知统计
export interface NotificationStats {
  total: number;
  readCount: number;
  leaveCount: number;
  unconfirmedCount: number;
}

// 通知确认记录
export interface ConfirmRecord {
  id: string;
  notificationId: string;
  memberId: string;
  memberName: string;
  avatar: string;
  status: 'read' | 'leave' | 'unconfirmed';
  confirmTime?: string;
  leaveReason?: string;
}

// 标签类型
export type TagType = 'blue' | 'green' | 'amber' | 'purple' | 'rose';

// 状态类型
export type StatusType = 'pending' | 'approved' | 'rejected' | 'active' | 'inactive' | 'conflict';
