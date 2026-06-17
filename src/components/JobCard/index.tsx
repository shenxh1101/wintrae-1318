import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import Tag from '../Tag';
import type { RecruitJob } from '@/types';
import { formatDate } from '@/utils';

interface JobCardProps {
  job: RecruitJob;
  showApplyBtn?: boolean;
  onApply?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, showApplyBtn = true, onApply }) => {
  const handleCardClick = () => {
    Taro.navigateTo({
      url: `/pages/recruit-detail/index?id=${job.id}`
    });
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApply) {
      onApply();
    } else {
      Taro.navigateTo({
        url: `/pages/recruit-detail/index?id=${job.id}`
      });
    }
  };

  return (
    <View className={styles.card} onClick={handleCardClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{job.title}</Text>
        <Tag text={job.department} type="purple" className={styles.deptTag} />
      </View>
      <Text className={styles.desc}>{job.description}</Text>
      <View className={styles.meta}>
        <View className={styles.metaItem}>
          <Text>招聘人数</Text>
          <Text className={styles.quota}>{job.quota}人</Text>
        </View>
        <View className={styles.metaItem}>
          <Text>已报名</Text>
          <Text className={styles.metaValue}>{job.appliedCount}人</Text>
        </View>
      </View>
      {showApplyBtn && (
        <View className={styles.footer}>
          <Text className={styles.deadline}>截止：{formatDate(job.deadline)}</Text>
          <Button className={styles.applyBtn} onClick={handleApply}>
            立即报名
          </Button>
        </View>
      )}
    </View>
  );
};

export default JobCard;
