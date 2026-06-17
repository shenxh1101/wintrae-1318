import React, { useState, useMemo } from 'react';
import { View, Text, Input, Textarea, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import { formatDate } from '@/utils';
import type { ApplicationRecord } from '@/types';

const RecruitDetailPage: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const jobId = router.params.id || '';

  const job = useMemo(
    () => state.recruitJobs.find(j => j.id === jobId),
    [state.recruitJobs, jobId]
  );

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const isFormValid = useMemo(() => {
    return name.trim() && studentId.trim() && phone.trim() && selectedSlotId;
  }, [name, studentId, phone, selectedSlotId]);

  const selectedSlot = useMemo(() => {
    return job?.interviewSlots.find(s => s.id === selectedSlotId);
  }, [job, selectedSlotId]);

  const handleSubmit = () => {
    if (!isFormValid || !job || !selectedSlot) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    const newApp: ApplicationRecord = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      department: job.department,
      name: name.trim(),
      studentId: studentId.trim(),
      phone: phone.trim(),
      email: email.trim(),
      grade: grade.trim(),
      major: major.trim(),
      skills: [],
      introduction: introduction.trim(),
      interviewSlotId: selectedSlotId,
      interviewSlotInfo: `${formatDate(selectedSlot.date)} ${selectedSlot.startTime}-${selectedSlot.endTime} ${selectedSlot.location}`,
      status: 'pending',
      submitDate: new Date().toISOString().split('T')[0]
    };

    dispatch({ type: 'ADD_APPLICATION', payload: newApp });
    dispatch({
      type: 'UPDATE_INTERVIEW_SLOT',
      payload: {
        jobId: job.id,
        slotId: selectedSlotId,
        bookedCount: selectedSlot.bookedCount + 1
      }
    });

    console.log('[RecruitDetail] 提交报名:', newApp.id);

    Taro.showToast({ title: '报名成功！', icon: 'success' });
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/recruit/index' });
    }, 1500);
  };

  if (!job) {
    return (
      <View className={styles.page}>
        <View style={{ textAlign: 'center', padding: '100rpx 0' }}>
          <Text style={{ color: '#94a3b8' }}>岗位不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.banner}>
        <Text className={styles.jobTitle}>{job.title}</Text>
        <Text className={styles.jobDept}>{job.department}</Text>
        <View className={styles.jobMeta}>
          <Text>招聘 {job.quota} 人</Text>
          <Text>已报名 {job.appliedCount} 人</Text>
          <Text>截止 {formatDate(job.deadline)}</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>岗位要求</Text>
        <View className={styles.requirements}>
          {job.requirements.map((req, i) => (
            <Text key={i} className={styles.requireItem}>{req}</Text>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>岗位福利</Text>
        <View className={styles.requirements}>
          {job.benefits.map((b, i) => (
            <Text key={i} className={styles.requireItem}>{b}</Text>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>报名信息</Text>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>姓名<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.formInput}
            placeholder="请输入姓名"
            value={name}
            onInput={e => setName(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>学号<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.formInput}
            placeholder="请输入学号"
            value={studentId}
            onInput={e => setStudentId(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>联系电话<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.formInput}
            type="number"
            placeholder="请输入手机号"
            value={phone}
            onInput={e => setPhone(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>邮箱</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入邮箱（选填）"
            value={email}
            onInput={e => setEmail(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>年级</Text>
          <Input
            className={styles.formInput}
            placeholder="如：大二"
            value={grade}
            onInput={e => setGrade(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>专业</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入专业（选填）"
            value={major}
            onInput={e => setMajor(e.detail.value)}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>个人介绍</Text>
          <Textarea
            className={styles.formTextarea}
            placeholder="请简单介绍自己，包括技能、经历等（选填）"
            value={introduction}
            onInput={e => setIntroduction(e.detail.value)}
            maxlength={500}
          />
          <Text className={styles.formHint}>{introduction.length}/500字</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>选择面试时段<Text className={styles.required}>*</Text></Text>
        <View className={styles.slotList}>
          {job.interviewSlots.map(slot => {
            const isFull = slot.bookedCount >= slot.capacity;
            return (
              <View
                key={slot.id}
                className={classNames(
                  styles.slotItem,
                  selectedSlotId === slot.id && styles.selected,
                  isFull && styles.full
                )}
                onClick={() => !isFull && setSelectedSlotId(slot.id)}
              >
                <View className={styles.slotInfo}>
                  <Text className={styles.slotTime}>
                    {formatDate(slot.date)} {slot.startTime}-{slot.endTime}
                  </Text>
                  <Text className={styles.slotLocation}>{slot.location}</Text>
                </View>
                <Text className={classNames(styles.slotCapacity, isFull && styles.full)}>
                  {isFull ? '已满' : `${slot.bookedCount}/${slot.capacity}人`}
                </Text>
                <View
                  className={classNames(
                    styles.slotRadio,
                    selectedSlotId === slot.id && styles.selected
                  )}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View className={styles.footer}>
        <View
          className={classNames(styles.submitBtn, !isFormValid && styles.disabled)}
          onClick={handleSubmit}
        >
          提交报名
        </View>
      </View>
    </ScrollView>
  );
};

export default RecruitDetailPage;
