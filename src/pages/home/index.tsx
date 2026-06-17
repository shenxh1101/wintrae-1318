import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';
import JobCard from '@/components/JobCard';
import StatusBadge from '@/components/StatusBadge';
import { quickEntries } from '@/data/club';
import { useAppContext } from '@/store/AppContext';
import { formatDate } from '@/utils';

const HomePage: React.FC = () => {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(false);

  const { clubInfo, recruitJobs, scheduleShifts } = state;

  useEffect(() => {
    console.log('[Home] 页面加载');
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Taro.stopPullDownRefresh();
    }, 1000);
  };

  const handleEntryClick = (page: string) => {
    console.log('[Home] 点击快捷入口:', page);
    if (page.startsWith('/pages/recruit')) {
      Taro.switchTab({ url: '/pages/recruit/index' });
    } else if (page.startsWith('/pages/schedule')) {
      Taro.switchTab({ url: '/pages/schedule/index' });
    } else if (page.startsWith('/pages/members')) {
      Taro.switchTab({ url: '/pages/members/index' });
    } else if (page.startsWith('/pages/notifications')) {
      Taro.switchTab({ url: '/pages/notifications/index' });
    }
  };

  const handleActivityClick = (id: string) => {
    Taro.navigateTo({
      url: `/pages/schedule-detail/index?id=${id}`
    });
  };

  const handleSeeMoreJobs = () => {
    Taro.switchTab({ url: '/pages/recruit/index' });
  };

  const handleAdminClick = () => {
    Taro.navigateTo({ url: '/pages/admin/index' });
  };

  const hotJobs = recruitJobs.filter(j => j.status === 'recruiting').slice(0, 2);
  const upcomingActivity = scheduleShifts[0];

  return (
    <ScrollView
      className={styles.page}
      scrollY
      refresherEnabled
      refresherTriggered={loading}
      onRefresherRefresh={handleRefresh}
    >
      <View className={styles.header}>
        <View className={styles.logo}>
          <Image src={clubInfo.logo} mode="aspectFill" />
        </View>
        <View className={styles.clubInfo}>
          <Text className={styles.clubName}>{clubInfo.name}</Text>
          <Text className={styles.slogan}>{clubInfo.slogan}</Text>
        </View>
        <View className={styles.adminBtn} onClick={handleAdminClick}>
          <Text className={styles.adminIcon}>⚙️</Text>
        </View>
      </View>

      <View className={styles.stats}>
        <View className={styles.statCard}>
          <Text className={styles.statNum}>{clubInfo.memberCount}</Text>
          <Text className={styles.statLabel}>成员总数</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statNum}>{clubInfo.departmentCount}</Text>
          <Text className={styles.statLabel}>部门数量</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statNum}>{clubInfo.activityCount}</Text>
          <Text className={styles.statLabel}>活动数量</Text>
        </View>
      </View>

      <View className={styles.quickEntries}>
        <View className={styles.entryGrid}>
          {quickEntries.map((entry) => (
            <View
              key={entry.id}
              className={styles.entryItem}
              onClick={() => handleEntryClick(entry.page)}
            >
              <View
                className={styles.entryIcon}
                style={{ background: entry.color }}
              >
                {entry.id === 'entry1' && '📝'}
                {entry.id === 'entry2' && '📅'}
                {entry.id === 'entry3' && '👥'}
                {entry.id === 'entry4' && '🔔'}
              </View>
              <Text className={styles.entryTitle}>{entry.title}</Text>
              <Text className={styles.entryDesc}>{entry.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <SectionHeader title="社团介绍" />
        <View className={styles.introCard}>
          <Text className={styles.introText}>{clubInfo.description}</Text>
          <View className={styles.departments}>
            {clubInfo.departments.map((dept) => (
              <Button key={dept.id} className={styles.deptTag}>
                {dept.name}
              </Button>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <SectionHeader
          title="热门岗位"
          showMore
          moreText="查看全部"
          onMoreClick={handleSeeMoreJobs}
        />
        <View className={styles.jobList}>
          {hotJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </View>
      </View>

      {upcomingActivity && (
        <View className={styles.section}>
          <SectionHeader title="近期活动" />
          <View
            className={styles.activityPreview}
            onClick={() => handleActivityClick(upcomingActivity.id)}
          >
            <View className={styles.activityInfo}>
              <Text className={styles.activityTitle}>{upcomingActivity.activityTitle}</Text>
              <View className={styles.activityMeta}>
                <View className={styles.metaItem}>
                  <Text>📅</Text>
                  <Text>{formatDate(upcomingActivity.date)}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text>📍</Text>
                  <Text>{upcomingActivity.location}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text>👥</Text>
                  <Text>
                    {upcomingActivity.assignedMembers.length}/
                    {upcomingActivity.requiredCount}人
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HomePage;
