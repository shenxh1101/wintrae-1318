import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const MemberDetailPage: React.FC = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.icon}>👤</Text>
      <Text className={styles.title}>成员详情</Text>
      <Text className={styles.desc}>功能正在开发中...{'\n'}敬请期待</Text>
    </View>
  );
};

export default MemberDetailPage;
