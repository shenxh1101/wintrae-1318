import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import type { TagType } from '@/types';

interface TagProps {
  text: string;
  type?: TagType;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ text, type = 'blue', className }) => {
  return (
    <View className={classNames(styles.tag, styles[type], className)}>
      {text}
    </View>
  );
};

export default Tag;
