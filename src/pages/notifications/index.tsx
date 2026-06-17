import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import NotificationCard from '@/components/NotificationCard';
import { useAppContext } from '@/store/AppContext';

const NotificationsPage: React.FC = () => {
  const { state } = useAppContext();
  const [activeType, setActiveType] = useState('all');

  const types = [
    { id: 'all', name: '全部' },
    { id: 'activity', name: '活动通知' },
    { id: 'schedule', name: '排班通知' },
    { id: 'recruit', name: '招新通知' },
    { id: 'system', name: '系统通知' }
  ];

  const filteredNotifications = useMemo(() => {
    if (activeType === 'all') {
      return state.notifications;
    }
    return state.notifications.filter((n) => n.type === activeType);
  }, [activeType, state.notifications]);

  const unreadCount = useMemo(() => {
    return state.notifications.filter((n) => !n.isRead).length;
  }, [state.notifications]);

  const typeUnreadCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    types.forEach((type) => {
      if (type.id === 'all') {
        counts[type.id] = unreadCount;
      } else {
        counts[type.id] = state.notifications.filter(
          (n) => n.type === type.id && !n.isRead
        ).length;
      }
    });
    return counts;
  }, [unreadCount, state.notifications]);

  const handleTypeChange = (typeId: string) => {
    console.log('[Notifications] 切换类型:', typeId);
    setActiveType(typeId);
  };

  const needConfirmCount = useMemo(() => {
    return state.notifications.filter((n) => n.needConfirm && !n.isRead).length;
  }, [state.notifications]);

  return (
    <View className={styles.page}>
      <ScrollView scrollX className={styles.typeTabs}>
        {types.map((type) => (
          <View
            key={type.id}
            className={classNames(styles.typeTab, activeType === type.id && styles.active)}
            onClick={() => handleTypeChange(type.id)}
          >
            {type.name}
            {typeUnreadCounts[type.id] > 0 && (
              <View className={styles.badge}>{typeUnreadCounts[type.id]}</View>
            )}
          </View>
        ))}
      </ScrollView>

      <ScrollView scrollY className={styles.content}>
        {activeType === 'all' && (
          <View className={styles.summaryCard}>
            <Text className={styles.summaryTitle}>通知概览</Text>
            <View className={styles.summaryStats}>
              <View className={styles.summaryStat}>
                <Text className={styles.statNum}>{state.notifications.length}</Text>
                <Text className={styles.statLabel}>总通知</Text>
              </View>
              <View className={styles.summaryStat}>
                <Text className={styles.statNum}>{unreadCount}</Text>
                <Text className={styles.statLabel}>未读</Text>
              </View>
              <View className={styles.summaryStat}>
                <Text className={styles.statNum}>{needConfirmCount}</Text>
                <Text className={styles.statLabel}>待确认</Text>
              </View>
            </View>
          </View>
        )}

        <View className={styles.notificationList}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <View className={styles.empty}>
              <Text className={styles.emptyIcon}>🔔</Text>
              <Text className={styles.emptyText}>暂无通知</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsPage;
