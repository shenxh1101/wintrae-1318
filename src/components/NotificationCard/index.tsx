import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import Tag from '../Tag';
import type { Notification } from '@/types';
import { getNotificationTypeText } from '@/utils';

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/notification-detail/index?id=${notification.id}`
      });
    }
  };

  const getTagType = (type: string) => {
    const typeMap: Record<string, 'blue' | 'green' | 'amber' | 'purple'> = {
      activity: 'green',
      recruit: 'blue',
      system: 'purple',
      schedule: 'amber'
    };
    return typeMap[type] || 'blue';
  };

  return (
    <View
      className={classNames(styles.card, !notification.isRead && styles.unread)}
      onClick={handleClick}
    >
      <View className={styles.header}>
        <Text className={styles.title}>{notification.title}</Text>
        <Tag
          text={getNotificationTypeText(notification.type)}
          type={getTagType(notification.type)}
          className={styles.typeTag}
        />
      </View>

      <View className={styles.meta}>
        <Text className={styles.metaItem}>{notification.publisher}</Text>
        <Text className={styles.metaItem}>{notification.publishDate}</Text>
        {notification.needConfirm && (
          <View className={styles.needConfirm}>需确认</View>
        )}
      </View>

      <Text className={styles.preview}>{notification.content}</Text>

      {notification.needConfirm && (
        <View className={styles.stats}>
          <View className={styles.statItems}>
            <View className={`${styles.statItem} ${styles.read}`}>
              <Text className={styles.num}>{notification.stats.readCount}</Text>
              <Text>已读</Text>
            </View>
            <View className={`${styles.statItem} ${styles.leave}`}>
              <Text className={styles.num}>{notification.stats.leaveCount}</Text>
              <Text>请假</Text>
            </View>
            <View className={`${styles.statItem} ${styles.unconfirmed}`}>
              <Text className={styles.num}>{notification.stats.unconfirmedCount}</Text>
              <Text>未确认</Text>
            </View>
          </View>
          <Text className={styles.arrow}>›</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationCard;
