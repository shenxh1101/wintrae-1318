import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import type { StatusType } from '@/types';
import { getStatusText } from '@/utils';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <View className={classNames(styles.badge, styles[status as string], className)}>
      {getStatusText(status)}
    </View>
  );
};

export default StatusBadge;
