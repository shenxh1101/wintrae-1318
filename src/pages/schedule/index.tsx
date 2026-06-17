import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import ScheduleCard from '@/components/ScheduleCard';
import { scheduleShifts, activities } from '@/data/schedule';

const SchedulePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const dates = useMemo(() => {
    const dateSet = new Set(scheduleShifts.map((s) => s.date));
    return Array.from(dateSet).sort();
  }, []);

  const conflictCount = useMemo(() => {
    return scheduleShifts.filter((s) => s.hasConflict).length;
  }, []);

  const filteredShifts = useMemo(() => {
    let result = scheduleShifts;

    if (selectedDate !== 'all') {
      result = result.filter((s) => s.date === selectedDate);
    }

    if (activeTab === 'mine') {
      result = result.filter((s) =>
        s.assignedMembers.some((m) => m.memberId === 'm007')
      );
    }

    return result;
  }, [activeTab, selectedDate]);

  const handleTabChange = (tab: 'all' | 'mine') => {
    console.log('[Schedule] 切换Tab:', tab);
    setActiveTab(tab);
  };

  const handleDateChange = (date: string) => {
    console.log('[Schedule] 选择日期:', date);
    setSelectedDate(date === selectedDate ? 'all' : date);
  };

  const handleClaim = (shiftId: string) => {
    console.log('[Schedule] 认领岗位:', shiftId);
    Taro.showModal({
      title: '确认认领',
      content: '确定要领这个值班岗位吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '认领成功',
            icon: 'success'
          });
        }
      }
    });
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
