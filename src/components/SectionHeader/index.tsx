import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface SectionHeaderProps {
  title: string;
  showMore?: boolean;
  moreText?: string;
  onMoreClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showMore = false,
  moreText = '更多',
  onMoreClick
}) => {
  return (
    <View className={styles.header}>
      <View className={styles.titleWrap}>
        <View className={styles.accent}></View>
        <Text className={styles.title}>{title}</Text>
      </View>
      {showMore && (
        <View className={styles.more} onClick={onMoreClick}>
          <Text>{moreText}</Text>
          <Text className={styles.arrow}>›</Text>
        </View>
      )}
    </View>
  );
};

export default SectionHeader;
