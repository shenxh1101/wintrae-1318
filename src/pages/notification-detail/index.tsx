import React, { useState, useMemo } from 'react';
import { View, Text, Image, Textarea, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import Tag from '@/components/Tag';
import { getNotificationTypeText } from '@/utils';
import type { ConfirmRecord } from '@/types';

const NotificationDetailPage: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const notifId = router.params.id || '';

  const notification = useMemo(
    () => state.notifications.find(n => n.id === notifId),
    [state.notifications, notifId]
  );

  const records = useMemo(
    () => state.confirmRecords.filter(cr => cr.notificationId === notifId),
    [state.confirmRecords, notifId]
  );

  const currentMemberId = state.currentMember.id;

  const [filterType, setFilterType] = useState<'all' | 'read' | 'leave' | 'unconfirmed'>('all');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');

  const myRecord = useMemo(
    () => records.find(cr => cr.memberId === currentMemberId),
    [records, currentMemberId]
  );

  const myStatus = myRecord?.status || 'unconfirmed';

  const filteredRecords = useMemo(() => {
    if (filterType === 'all') return records;
    return records.filter(r => r.status === filterType);
  }, [records, filterType]);

  const handleConfirm = () => {
    if (!notification || myStatus === 'read') return;
    dispatch({
      type: 'CONFIRM_NOTIFICATION',
      payload: { notificationId: notifId, memberId: currentMemberId }
    });
    dispatch({ type: 'READ_NOTIFICATION', payload: notifId });
    console.log('[NotificationDetail] 确认已读:', notifId);
    Taro.showToast({ title: '已确认', icon: 'success' });
  };

  const handleLeave = () => {
    setShowLeaveModal(true);
  };

  const submitLeave = () => {
    if (!leaveReason.trim()) {
      Taro.showToast({ title: '请填写请假原因', icon: 'none' });
      return;
    }
    dispatch({
      type: 'LEAVE_NOTIFICATION',
      payload: {
        notificationId: notifId,
        memberId: currentMemberId,
        reason: leaveReason.trim()
      }
    });
    dispatch({ type: 'READ_NOTIFICATION', payload: notifId });
    console.log('[NotificationDetail] 请假:', notifId);
    setShowLeaveModal(false);
    setLeaveReason('');
    Taro.showToast({ title: '已提交请假', icon: 'success' });
  };

  const getTagType = (type: string) => {
    const map: Record<string, 'blue' | 'green' | 'amber' | 'purple'> = {
      activity: 'green', recruit: 'blue', system: 'purple', schedule: 'amber'
    };
    return map[type] || 'blue';
  };

  if (!notification) {
    return (
      <View className={styles.page}>
        <View style={{ textAlign: 'center', padding: '100rpx 0' }}>
          <Text style={{ color: '#94a3b8' }}>通知不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.header}>
        <View className={styles.typeTag}>
          <Tag
            text={getNotificationTypeText(notification.type)}
            type={getTagType(notification.type)}
          />
        </View>
        <Text className={styles.title}>{notification.title}</Text>
        <View className={styles.meta}>
          <Text>{notification.publisher}</Text>
          <Text>{notification.publishDate}</Text>
        </View>
        {notification.needConfirm && notification.confirmDeadline && (
          <View className={styles.deadline}>
            <Text>⏰ 确认截止：{notification.confirmDeadline}</Text>
          </View>
        )}
      </View>

      <View className={styles.content}>
        <Text className={styles.contentTitle}>通知正文</Text>
        <Text className={styles.contentText}>{notification.content}</Text>
      </View>

      {notification.needConfirm && (
        <View className={styles.statsSection}>
          <Text className={styles.statsTitle}>确认统计</Text>
          <View className={styles.statsGrid}>
            <View className={styles.statItem}>
              <Text className={`${styles.statNum} ${styles.read}`}>
                {notification.stats.readCount}
              </Text>
              <Text className={styles.statLabel}>已读</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={`${styles.statNum} ${styles.leave}`}>
                {notification.stats.leaveCount}
              </Text>
              <Text className={styles.statLabel}>请假</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={`${styles.statNum} ${styles.unconfirmed}`}>
                {notification.stats.unconfirmedCount}
              </Text>
              <Text className={styles.statLabel}>未确认</Text>
            </View>
          </View>

          <View className={styles.filterTabs}>
            {[
              { id: 'all', name: '全部' },
              { id: 'read', name: '已读' },
              { id: 'leave', name: '请假' },
              { id: 'unconfirmed', name: '未确认' }
            ].map(tab => (
              <View
                key={tab.id}
                className={classNames(styles.filterTab, filterType === tab.id && styles.active)}
                onClick={() => setFilterType(tab.id as typeof filterType)}
              >
                {tab.name}
              </View>
            ))}
          </View>

          <View className={styles.memberList}>
            {filteredRecords.map(record => (
              <View
                key={record.id}
                className={classNames(styles.memberItem, styles[record.status])}
              >
                <View className={styles.memberAvatar}>
                  <Image src={record.avatar} mode="aspectFill" />
                </View>
                <View className={styles.memberInfo}>
                  <Text className={styles.memberName}>{record.memberName}</Text>
                  {record.status === 'read' && (
                    <Text className={styles.memberStatus}>
                      已确认 {record.confirmTime}
                    </Text>
                  )}
                  {record.status === 'leave' && (
                    <Text className={styles.memberReason}>
                      请假：{record.leaveReason || '未填写原因'}
                    </Text>
                  )}
                  {record.status === 'unconfirmed' && (
                    <Text className={styles.memberStatus}>未确认</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {notification.needConfirm && (
        <View className={styles.footer}>
          <View
            className={classNames(
              styles.confirmBtn,
              myStatus === 'read' && styles.done,
              myStatus === 'leave' && styles.disabled
            )}
            onClick={myStatus === 'unconfirmed' ? handleConfirm : undefined}
          >
            {myStatus === 'read' ? '✓ 已确认' : '确认已读'}
          </View>
          <View
            className={classNames(styles.leaveBtn, myStatus === 'leave' && styles.done)}
            onClick={myStatus !== 'leave' ? handleLeave : undefined}
          >
            {myStatus === 'leave' ? '已请假' : '请假'}
          </View>
        </View>
      )}

      {showLeaveModal && (
        <View className={styles.modalOverlay} onClick={() => setShowLeaveModal(false)}>
          <View className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <Text className={styles.modalTitle}>提交请假</Text>
            <Textarea
              className={styles.modalInput}
              placeholder="请输入请假原因"
              value={leaveReason}
              onInput={e => setLeaveReason(e.detail.value)}
              maxlength={200}
            />
            <View className={styles.modalBtns}>
              <View className={styles.modalCancelBtn} onClick={() => setShowLeaveModal(false)}>
                取消
              </View>
              <View className={styles.modalConfirmBtn} onClick={submitLeave}>
                提交
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default NotificationDetailPage;
