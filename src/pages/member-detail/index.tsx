import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';

const MemberDetailPage: React.FC = () => {
  const router = useRouter();
  const { state } = useAppContext();
  const memberId = router.params.id || '';

  const member = useMemo(
    () => state.members.find(m => m.id === memberId),
    [state.members, memberId]
  );

  if (!member) {
    return (
      <View className={styles.page}>
        <View style={{ textAlign: 'center', padding: '100rpx 0' }}>
          <Text style={{ color: '#94a3b8' }}>成员不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.profileHeader}>
        <View className={styles.avatar}>
          <Image src={member.avatar} mode="aspectFill" />
        </View>
        <View className={styles.profileInfo}>
          <Text className={styles.profileName}>{member.name}</Text>
          <Text className={styles.profilePosition}>{member.position}</Text>
          <Text className={styles.profileDept}>{member.department} · {member.grade}</Text>
          <View className={`${styles.activeTag} ${member.isActive ? styles.active : styles.inactive}`}>
            {member.isActive ? '活跃' : '不活跃'}
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>基本信息</Text>
        <View className={styles.infoGrid}>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>学号</Text>
            <Text className={styles.infoValue}>{member.studentId}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>年级</Text>
            <Text className={styles.infoValue}>{member.grade}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>专业</Text>
            <Text className={styles.infoValue}>{member.major}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>部门</Text>
            <Text className={styles.infoValue}>{member.department}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>职位</Text>
            <Text className={styles.infoValue}>{member.position}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>入团时间</Text>
            <Text className={styles.infoValue}>{member.joinDate}</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>联系方式</Text>
        <View className={styles.infoGrid}>
          <View className={styles.contactRow}>
            <View className={`${styles.contactIcon} ${styles.phone}`}>
              <Text>�</Text>
            </View>
            <View className={styles.contactInfo}>
              <Text className={styles.contactLabel}>电话</Text>
              <Text className={styles.contactValue}>{member.phone}</Text>
            </View>
          </View>
          <View className={styles.contactRow}>
            <View className={`${styles.contactIcon} ${styles.email}`}>
              <Text>✉️</Text>
            </View>
            <View className={styles.contactInfo}>
              <Text className={styles.contactLabel}>邮箱</Text>
              <Text className={styles.contactValue}>{member.email}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>技能标签</Text>
        <View className={styles.skillsWrap}>
          {member.skills.map((skill, index) => (
            <View key={index} className={styles.skillTag}>
              <Text>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>职责说明</Text>
        <Text className={styles.dutyText}>{member.duty}</Text>
      </View>
    </ScrollView>
  );
};

export default MemberDetailPage;
