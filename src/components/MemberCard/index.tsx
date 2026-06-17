import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import StatusBadge from '../StatusBadge';
import type { Member } from '@/types';

interface MemberCardProps {
  member: Member;
  showStatus?: boolean;
  onClick?: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, showStatus = false, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/member-detail/index?id=${member.id}`
      });
    }
  };

  const displaySkills = member.skills.slice(0, 3);

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.avatar}>
        <Image src={member.avatar} mode="aspectFill" />
      </View>
      <View className={styles.info}>
        <View className={styles.nameRow}>
          <Text className={styles.name}>{member.name}</Text>
          <Text className={styles.position}>{member.position}</Text>
        </View>
        <Text className={styles.dept}>{member.department} · {member.grade}</Text>
        <View className={styles.skills}>
          {displaySkills.map((skill, index) => (
            <Text key={index} className={styles.skillTag}>{skill}</Text>
          ))}
        </View>
      </View>
      {showStatus && (
        <StatusBadge
          status={member.isActive ? 'active' : 'inactive'}
          className={styles.statusBadge}
        />
      )}
    </View>
  );
};

export default MemberCard;
