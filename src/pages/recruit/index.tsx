import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import JobCard from '@/components/JobCard';
import StatusBadge from '@/components/StatusBadge';
import { recruitJobs, myApplications } from '@/data/recruit';

const RecruitPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'my'>('jobs');

  const handleTabChange = (tab: 'jobs' | 'my') => {
    console.log('[Recruit] 切换Tab:', tab);
    setActiveTab(tab);
  };

  const handleApply = (jobId: string) => {
    console.log('[Recruit] 申请岗位:', jobId);
    Taro.navigateTo({
      url: `/pages/recruit-detail/index?id=${jobId}`
    });
  };

  const handleGoJobs = () => {
    setActiveTab('jobs');
  };

  return (
    <View className={styles.page}>
      <View className={styles.tabs}>
        <View
          className={classNames(styles.tabItem, activeTab === 'jobs' && styles.active)}
          onClick={() => handleTabChange('jobs')}
        >
          招聘岗位
        </View>
        <View
          className={classNames(styles.tabItem, activeTab === 'my' && styles.active)}
          onClick={() => handleTabChange('my')}
        >
          我的申请
        </View>
      </View>

      <View className={styles.content}>
        {activeTab === 'jobs' && (
          <View className={styles.jobList}>
            {recruitJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job.id)}
              />
            ))}
          </View>
        )}

        {activeTab === 'my' && (
          <View className={styles.myAppList}>
            {myApplications.length > 0 ? (
              myApplications.map((app) => (
                <View key={app.id} className={styles.appCard}>
                  <View className={styles.appHeader}>
                    <View className={styles.appJobInfo}>
                      <Text className={styles.appJobTitle}>{app.jobTitle}</Text>
                      <Text className={styles.appDept}>{app.department}</Text>
                    </View>
                    <View className={styles.appStatus}>
                      <StatusBadge status={app.status} />
                    </View>
                  </View>

                  {app.interviewSlotInfo && (
                    <View className={styles.appMeta}>
                      <View className={styles.appMetaItem}>
                        <Text className={styles.label}>面试时间</Text>
                        <Text>{app.interviewSlotInfo}</Text>
                      </View>
                    </View>
                  )}

                  <View className={styles.appMeta}>
                    <View className={styles.appMetaItem}>
                      <Text className={styles.label}>提交时间</Text>
                      <Text>{app.submitDate}</Text>
                    </View>
                  </View>

                  {app.feedback && (
                    <View className={styles.appFeedback}>
                      {app.feedback}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View className={styles.empty}>
                <Text className={styles.emptyIcon}>📋</Text>
                <Text className={styles.emptyText}>暂无申请记录</Text>
                <Button className={styles.emptyBtn} onClick={handleGoJobs}>
                  去看看岗位
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default RecruitPage;
