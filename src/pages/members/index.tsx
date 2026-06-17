import React, { useState, useMemo } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import MemberCard from '@/components/MemberCard';
import { useAppContext } from '@/store/AppContext';

const departments = [
  { id: 'all', name: '全部' },
  { id: 'dept001', name: '技术部' },
  { id: 'dept002', name: '策划部' },
  { id: 'dept003', name: '宣传部' },
  { id: 'dept004', name: '外联部' },
  { id: 'dept005', name: '行政部' }
];

const MembersPage: React.FC = () => {
  const { state } = useAppContext();
  const [activeDept, setActiveDept] = useState('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredMembers = useMemo(() => {
    let result = state.members;

    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      result = result.filter((m) =>
        m.name.toLowerCase().includes(kw) ||
        m.department.toLowerCase().includes(kw) ||
        m.skills.some(s => s.toLowerCase().includes(kw)) ||
        m.position.toLowerCase().includes(kw) ||
        m.major.toLowerCase().includes(kw)
      );
    }

    if (activeDept !== 'all') {
      result = result.filter((m) => m.departmentId === activeDept);
    }

    if (showActiveOnly) {
      result = result.filter((m) => m.isActive);
    }

    return result;
  }, [state.members, activeDept, showActiveOnly, searchKeyword]);

  const handleDeptChange = (deptId: string) => {
    console.log('[Members] 切换部门:', deptId);
    setActiveDept(deptId);
  };

  const toggleActiveFilter = () => {
    console.log('[Members] 切换活跃筛选:', !showActiveOnly);
    setShowActiveOnly(!showActiveOnly);
  };

  const activeCount = state.members.filter((m) => m.isActive).length;

  return (
    <View className={styles.page}>
      <View className={styles.searchBar}>
        <View className={styles.searchInput}>
          <Text className={styles.icon}>🔍</Text>
          <Input
            className={styles.inputField}
            placeholder="搜索姓名、部门、技能..."
            placeholderClass={styles.placeholderClass}
            value={searchKeyword}
            onInput={e => setSearchKeyword(e.detail.value)}
          />
        </View>
      </View>

      <ScrollView scrollX className={styles.deptTabs}>
        {departments.map((dept) => (
          <View
            key={dept.id}
            className={classNames(styles.deptTab, activeDept === dept.id && styles.active)}
            onClick={() => handleDeptChange(dept.id)}
          >
            {dept.name}
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
            <Text className={styles.emptyText}>
              {searchKeyword ? '未找到匹配的成员' : '暂无成员数据'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MembersPage;
