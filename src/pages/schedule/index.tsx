import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import ScheduleCard from '@/components/ScheduleCard';
import { useAppContext } from '@/store/AppContext';

const SchedulePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const currentMember = state.currentMember;
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const dates = useMemo(() => {
    const dateSet = new Set(state.scheduleShifts.map((s) => s.date));
    return Array.from(dateSet).sort();
  }, [state.scheduleShifts]);

  const conflictCount = useMemo(() => {
    return state.scheduleShifts.filter((s) => s.hasConflict).length;
  }, [state.scheduleShifts]);

  const filteredShifts = useMemo(() => {
    let result = state.scheduleShifts;

    if (selectedDate !== 'all') {
      result = result.filter((s) => s.date === selectedDate);
    }

    if (activeTab === 'mine') {
      result = result.filter((s) =>
        s.assignedMembers.some((m) => m.memberId === currentMember.id)
      );
    }

    return result;
  }, [activeTab, selectedDate, state.scheduleShifts, currentMember.id]);

  const handleTabChange = (tab: 'all' | 'mine') => {
    console.log('[Schedule] 切换Tab:', tab);
    setActiveTab(tab);
  };

  const handleDateChange = (date: string) => {
    console.log('[Schedule] 选择日期:', date);
    setSelectedDate(date === selectedDate ? 'all' : date);
  };

  const handleClaim = (shiftId: string) => {
    const shift = state.scheduleShifts.find(s => s.id === shiftId);
    if (!shift) return;

    const alreadyInShift = shift.assignedMembers.some(
      m => m.memberId === currentMember.id
    );
    if (alreadyInShift) {
      Taro.showToast({ title: '你已经在这个岗位了', icon: 'none' });
      return;
    }

    const isFull = shift.assignedMembers.length >= shift.requiredCount;
    if (isFull) {
      Taro.showToast({ title: '该岗位已满员', icon: 'none' });
      return;
    }

    const myShifts = state.scheduleShifts.filter(s =>
      s.assignedMembers.some(m => m.memberId === currentMember.id)
    );
    const hasTimeConflict = myShifts.some(s =>
      s.date === shift.date &&
      timeRangesOverlap(s.startTime, s.endTime, shift.startTime, shift.endTime)
    );

    if (hasTimeConflict) {
      Taro.showModal({
        title: '时间冲突提醒',
        content: '你同一时间段已有值班安排，确定要认领此岗位吗？',
        confirmText: '仍然认领',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            doClaim(shiftId);
          }
        }
      });
    } else {
      Taro.showModal({
        title: '确认认领',
        content: `确定要认领「${shift.position}」岗位吗？`,
        success: (res) => {
          if (res.confirm) {
            doClaim(shiftId);
          }
        }
      });
    }
  };

  const doClaim = (shiftId: string) => {
    dispatch({
      type: 'CLAIM_SHIFT',
      payload: {
        shiftId,
        member: {
          memberId: currentMember.id,
          memberName: currentMember.name,
          avatar: currentMember.avatar
        }
      }
    });
    console.log('[Schedule] 认领岗位:', shiftId);
    Taro.showToast({ title: '认领成功', icon: 'success' });
  };

  const timeRangesOverlap = (start1: string, end1: string, start2: string, end2: string) => {
    const toMin = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const s1 = toMin(start1), e1 = toMin(end1);
    const s2 = toMin(start2), e2 = toMin(end2);
    return s1 < e2 && s2 < e1;
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      day: dayNames[date.getDay()],
      date: date.getDate()
    };
  };

  return (
    <View className={styles.page}>
      <View className={styles.tabs}>
        <View
          className={classNames(styles.tabItem, activeTab === 'all' && styles.active)}
          onClick={() => handleTabChange('all')}
        >
          全部排班
        </View>
        <View
          className={classNames(styles.tabItem, activeTab === 'mine' && styles.active)}
          onClick={() => handleTabChange('mine')}
        >
          我的值班
        </View>
      </View>

      <ScrollView scrollY className={styles.content}>
        {conflictCount > 0 && activeTab === 'all' && (
          <View className={styles.conflictAlert}>
            <Text className={styles.conflictIcon}>⚠️</Text>
            <Text className={styles.conflictText}>
              有 {conflictCount} 个排班存在人员时间冲突，请及时调整
            </Text>
          </View>
        )}

        <ScrollView scrollX className={styles.dateSelector}>
          {dates.map((date) => {
            const { day, date: dateNum } = formatDateDisplay(date);
            return (
              <View
                key={date}
                className={classNames(
                  styles.dateItem,
                  selectedDate === date && styles.active
                )}
                onClick={() => handleDateChange(date)}
              >
                <Text className={styles.day}>{day}</Text>
                <Text className={styles.date}>{dateNum}</Text>
              </View>
            );
          })}
        </ScrollView>

        <View className={styles.shiftList}>
          {filteredShifts.length > 0 ? (
            filteredShifts.map((shift) => (
              <ScheduleCard
                key={shift.id}
                shift={shift}
                currentMemberId={currentMember.id}
                onClaim={() => handleClaim(shift.id)}
              />
            ))
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>📅</Text>
              <Text className={styles.emptyText}>暂无排班信息</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SchedulePage;
