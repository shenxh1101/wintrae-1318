import React from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import StatusBadge from '../StatusBadge';
import type { ScheduleShift } from '@/types';
import { formatDate } from '@/utils';

interface ScheduleCardProps {
  shift: ScheduleShift;
  currentMemberId?: string;
  showClaimBtn?: boolean;
  onClaim?: () => void;
  onDetail?: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  shift,
  currentMemberId,
  showClaimBtn = true,
  onClaim,
  onDetail
}) => {
  const handleDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDetail) {
      onDetail();
    } else {
      Taro.navigateTo({
        url: `/pages/schedule-detail/index?id=${shift.id}`
      });
    }
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClaim) {
      onClaim();
    }
  };

  const handleCardClick = () => {
    Taro.navigateTo({
      url: `/pages/schedule-detail/index?id=${shift.id}`
    });
  };

  const isFull = shift.assignedMembers.length >= shift.requiredCount;
  const alreadyClaimed = currentMemberId
    ? shift.assignedMembers.some(m => m.memberId === currentMemberId)
    : false;

  const getClaimBtnText = () => {
    if (alreadyClaimed) return '已认领';
    if (isFull) return '已满员';
    return '我要认领';
  };

  const isClaimDisabled = isFull || alreadyClaimed;

  return (
    <View className={styles.card} onClick={handleCardClick}>
      {shift.hasConflict && (
        <View className={styles.conflictTip}>
          <Text className={styles.icon}>⚠</Text>
          <Text className={styles.text}>存在人员时间冲突，请注意调整</Text>
        </View>
      )}

      <View className={styles.header}>
        <View className={styles.left}>
          <Text className={styles.activity}>{shift.activityTitle}</Text>
          <Text className={styles.position}>{shift.position}</Text>
        </View>
        <View className={styles.right}>
          <StatusBadge status={shift.hasConflict ? 'conflict' : 'active'} />
        </View>
      </View>

      <View className={styles.infoRow}>
        <Text className={styles.icon}>📅</Text>
        <Text className={styles.text}>
          {formatDate(shift.date)} {shift.startTime}-{shift.endTime}
        </Text>
      </View>

      <View className={styles.infoRow}>
        <Text className={styles.icon}>📍</Text>
        <Text className={styles.text}>{shift.location}</Text>
      </View>

      <Text className={styles.desc}>{shift.description}</Text>

      <View className={styles.memberSection}>
        <View className={styles.memberHeader}>
          <Text className={styles.memberLabel}>值班人员</Text>
          <Text className={styles.memberCount}>
            <Text className={styles.current}>{shift.assignedMembers.length}</Text>
            /{shift.requiredCount}人
          </Text>
        </View>

        <View className={styles.memberAvatars}>
          {shift.assignedMembers.slice(0, 5).map((member, index) => (
            <View
              key={member.memberId}
              className={`${styles.avatarItem} ${member.isLeader ? styles.leader : ''}`}
            >
              <Image src={member.avatar} mode="aspectFill" />
            </View>
          ))}
          {shift.assignedMembers.length > 5 && (
            <Text className={styles.moreText}>
              +{shift.assignedMembers.length - 5}人
            </Text>
          )}
          {shift.assignedMembers.length === 0 && (
            <Text className={styles.moreText}>暂无人员</Text>
          )}
        </View>
      </View>

      {showClaimBtn && (
        <View className={styles.footer}>
          <Button className={styles.detailBtn} onClick={handleDetail}>
            查看详情
          </Button>
          <Button
            className={`${styles.claimBtn} ${isClaimDisabled ? styles.disabled : ''}`}
            onClick={handleClaim}
            disabled={isClaimDisabled}
          >
            {getClaimBtnText()}
          </Button>
        </View>
      )}
    </View>
  );
};

export default ScheduleCard;
