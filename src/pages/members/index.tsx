import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import MemberCard from '@/components/MemberCard';
import { members, departments } from '@/data/members';

const MembersPage: React.FC = () => {
  const [activeDept, setActiveDept] = useState('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filteredMembers = useMemo(() => {
    let result = members;

    if (activeDept !== 'all') {
      result = result.filter((m) => m.departmentId === activeDept);
    }

    if (showActiveOnly) {
      result = result.filter((m) => m.isActive);
    }

    return result;
  }, [activeDept, showActiveOnly]);

  const handleDeptChange = (deptId: string) => {
    console.log('[Members] 切换部门:', deptId);
    setActiveDept(deptId);
  };

  const toggleActiveFilter = () => {
    console.log('[Members] 切换活跃筛选:', !showActiveOnly);
    setShowActiveOnly(!showActiveOnly);
  };

  const activeCount = members.filter((m) => m.isActive).length;

  return (
    <View className={styles.page}>
      <View className={styles.searchBar}>
        <View className={styles.searchInput}>
          <Text className={styles.icon}>🔍</Text>
          <Text className={styles.placeholder}>搜索成员姓名、技能、部门...</Text>
        </View>
      </View>

      <ScrollView scrollX className={styles.deptTabs}>
        {departments.map((dept) => (
          <View
            key={dept.id}
            className={classNames(styles.deptTab, activeDept === dept.id && styles.active)}
            onClick={() => handleDeptChange(dept.id)}
          >
            {dept.name} ({dept.count})
          </View>
        ))}
      </ScrollView>

      <View className={styles.statsBar}>
        <Text>共 {filteredMembers.length} 位成员</Text>
        <View
          className={classNames(styles.filterBtn, showActiveOnly && styles.active)}
          onClick={toggleActiveFilter}
        >
          <Text>活跃成员 ({activeCount})</Text>
          <Text>{showActiveOnly ? '✓' : ''}</Text>
        </View>
      </View>

      <View className={styles.memberList}>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} showStatus />
          ))
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>👥</Text>
            <Text className={styles.emptyText}>暂无成员数据</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MembersPage;
