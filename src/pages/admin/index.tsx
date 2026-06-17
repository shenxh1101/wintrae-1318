import React, { useState } from 'react';
import { View, Text, Input, Textarea, ScrollView, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import type { InterviewSlot, RecruitJob } from '@/types';

interface SlotForm {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
}

const AdminPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState<'club' | 'job'>('club');

  const [clubDesc, setClubDesc] = useState(state.clubInfo.description);
  const [clubSlogan, setClubSlogan] = useState(state.clubInfo.slogan);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState(state.clubInfo.departments[0]?.name || '');
  const [jobDeptId, setJobDeptId] = useState(state.clubInfo.departments[0]?.id || '');
  const [jobDesc, setJobDesc] = useState('');
  const [jobQuota, setJobQuota] = useState('3');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobBenefits, setJobBenefits] = useState('');
  const [jobDeadline, setJobDeadline] = useState('');
  const [slots, setSlots] = useState<SlotForm[]>([
    { id: `s_${Date.now()}`, date: '', startTime: '09:00', endTime: '10:00', location: '', capacity: 5 }
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveClub = () => {
    dispatch({
      type: 'UPDATE_CLUB_INFO',
      payload: { description: clubDesc, slogan: clubSlogan }
    });
    Taro.showToast({ title: '保存成功', icon: 'success' });
  };

  const handleAddSlot = () => {
    setSlots([
      ...slots,
      { id: `s_${Date.now()}`, date: '', startTime: '09:00', endTime: '10:00', location: '', capacity: 5 }
    ]);
  };

  const handleRemoveSlot = (slotId: string) => {
    if (slots.length <= 1) {
      Taro.showToast({ title: '至少保留一个面试时段', icon: 'none' });
      return;
    }
    setSlots(slots.filter(s => s.id !== slotId));
  };

  const handleSlotChange = (slotId: string, field: keyof SlotForm, value: string | number) => {
    setSlots(slots.map(s => s.id === slotId ? { ...s, [field]: value } : s));
  };

  const handlePublishJob = () => {
    if (!jobTitle.trim()) {
      Taro.showToast({ title: '请填写岗位名称', icon: 'none' });
      return;
    }
    if (!jobDesc.trim()) {
      Taro.showToast({ title: '请填写岗位描述', icon: 'none' });
      return;
    }
    if (!jobQuota || parseInt(jobQuota) <= 0) {
      Taro.showToast({ title: '请填写招聘人数', icon: 'none' });
      return;
    }

    const validSlots = slots.filter(s => s.date && s.startTime && s.endTime);
    if (validSlots.length === 0) {
      Taro.showToast({ title: '请至少添加一个面试时段', icon: 'none' });
      return;
    }

    const interviewSlots: InterviewSlot[] = validSlots.map((s, i) => ({
      id: `slot_${Date.now()}_${i}`,
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
      location: s.location || '待定',
      capacity: s.capacity,
      bookedCount: 0
    }));

    const newJob: RecruitJob = {
      id: `job_${Date.now()}`,
      title: jobTitle.trim(),
      department: jobDept,
      departmentId: jobDeptId,
      description: jobDesc.trim(),
      requirements: jobRequirements.split('\n').filter(r => r.trim()),
      benefits: jobBenefits.split('\n').filter(b => b.trim()),
      quota: parseInt(jobQuota),
      appliedCount: 0,
      status: 'recruiting',
      interviewSlots,
      publishDate: new Date().toISOString().split('T')[0],
      deadline: jobDeadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    };

    dispatch({ type: 'ADD_RECRUIT_JOB', payload: newJob });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setJobTitle('');
      setJobDesc('');
      setJobQuota('3');
      setJobRequirements('');
      setJobBenefits('');
      setJobDeadline('');
      setSlots([{ id: `s_${Date.now()}`, date: '', startTime: '09:00', endTime: '10:00', location: '', capacity: 5 }]);
    }, 1500);

    Taro.showToast({ title: '发布成功', icon: 'success' });
  };

  const deptNames = state.clubInfo.departments.map(d => d.name);
  const [deptIndex, setDeptIndex] = useState(0);

  const handleDeptPick = (e) => {
    const idx = e.detail.value;
    setDeptIndex(idx);
    setJobDept(state.clubInfo.departments[idx].name);
    setJobDeptId(state.clubInfo.departments[idx].id);
  };

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.tabBar}>
        <View
          className={classNames(styles.tabItem, activeTab === 'club' && styles.active)}
          onClick={() => setActiveTab('club')}
        >
          <Text>社团介绍</Text>
        </View>
        <View
          className={classNames(styles.tabItem, activeTab === 'job' && styles.active)}
          onClick={() => setActiveTab('job')}
        >
          <Text>发布岗位</Text>
        </View>
      </View>

      {activeTab === 'club' && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>编辑社团介绍</Text>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>社团口号</Text>
            <Input
              className={styles.formInput}
              value={clubSlogan}
              onInput={e => setClubSlogan(e.detail.value)}
              placeholder="输入社团口号"
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>社团介绍</Text>
            <Textarea
              className={styles.formTextarea}
              value={clubDesc}
              onInput={e => setClubDesc(e.detail.value)}
              placeholder="输入社团介绍内容"
              maxlength={500}
            />
          </View>

          <View
            className={styles.submitBtn}
            onClick={handleSaveClub}
          >
            <Text>保存修改</Text>
          </View>
        </View>
      )}

      {activeTab === 'job' && (
        <View>
          {showSuccess && (
            <View className={styles.successTip}>
              <Text>✅ 岗位发布成功！学生端已可看到新岗位</Text>
            </View>
          )}

          <View className={styles.section}>
            <Text className={styles.sectionTitle}>岗位信息</Text>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>岗位名称 *</Text>
              <Input
                className={styles.formInput}
                value={jobTitle}
                onInput={e => setJobTitle(e.detail.value)}
                placeholder="如：前端开发工程师"
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>所属部门</Text>
              <Picker mode="selector" range={deptNames} value={deptIndex} onChange={handleDeptPick}>
                <View className={styles.formPicker}>
                  <Text className={styles.pickerValue}>{deptNames[deptIndex]}</Text>
                  <Text className={styles.pickerArrow}>▼</Text>
                </View>
              </Picker>
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>岗位描述 *</Text>
              <Textarea
                className={styles.formTextarea}
                value={jobDesc}
                onInput={e => setJobDesc(e.detail.value)}
                placeholder="描述该岗位的工作内容"
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>招聘人数</Text>
              <Input
                className={styles.formInput}
                type="number"
                value={jobQuota}
                onInput={e => setJobQuota(e.detail.value)}
                placeholder="招聘人数"
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>岗位要求（每行一条）</Text>
              <Textarea
                className={styles.formTextarea}
                value={jobRequirements}
                onInput={e => setJobRequirements(e.detail.value)}
                placeholder="如：熟悉 React 框架&#10;有团队协作经验"
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>岗位福利（每行一条）</Text>
              <Textarea
                className={styles.formTextarea}
                value={jobBenefits}
                onInput={e => setJobBenefits(e.detail.value)}
                placeholder="如：提供技术培训&#10;项目实战机会"
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>截止日期</Text>
              <Picker mode="date" value={jobDeadline} onChange={e => setJobDeadline(e.detail.value)}>
                <View className={styles.formPicker}>
                  <Text className={styles.pickerValue}>{jobDeadline || '选择截止日期'}</Text>
                  <Text className={styles.pickerArrow}>▼</Text>
                </View>
              </Picker>
            </View>
          </View>

          <View className={styles.section}>
            <Text className={styles.sectionTitle}>面试时段</Text>

            {slots.map((slot, index) => (
              <View key={slot.id} className={styles.slotItem}>
                <View className={styles.slotRow}>
                  <Text className={styles.slotLabel}>日期</Text>
                  <Picker mode="date" value={slot.date} onChange={e => handleSlotChange(slot.id, 'date', e.detail.value)}>
                    <View className={styles.formPicker} style={{ height: '64rpx', flex: 1 }}>
                      <Text className={styles.pickerValue} style={{ fontSize: '24rpx' }}>{slot.date || '选择日期'}</Text>
                      <Text className={styles.pickerArrow}>▼</Text>
                    </View>
                  </Picker>
                </View>
                <View className={styles.slotRow}>
                  <Text className={styles.slotLabel}>时间</Text>
                  <Input
                    className={styles.slotInput}
                    value={slot.startTime}
                    onInput={e => handleSlotChange(slot.id, 'startTime', e.detail.value)}
                    placeholder="09:00"
                  />
                  <Text>-</Text>
                  <Input
                    className={styles.slotInput}
                    value={slot.endTime}
                    onInput={e => handleSlotChange(slot.id, 'endTime', e.detail.value)}
                    placeholder="10:00"
                  />
                </View>
                <View className={styles.slotRow}>
                  <Text className={styles.slotLabel}>地点</Text>
                  <Input
                    className={styles.slotInput}
                    value={slot.location}
                    onInput={e => handleSlotChange(slot.id, 'location', e.detail.value)}
                    placeholder="面试地点"
                  />
                </View>
                <View className={styles.slotRow}>
                  <Text className={styles.slotLabel}>容量</Text>
                  <Input
                    className={styles.slotInput}
                    type="number"
                    value={String(slot.capacity)}
                    onInput={e => handleSlotChange(slot.id, 'capacity', e.detail.value)}
                    placeholder="5"
                  />
                </View>
                <View className={styles.removeSlotBtn} onClick={() => handleRemoveSlot(slot.id)}>
                  <Text>✕</Text>
                </View>
              </View>
            ))}

            <View className={styles.addSlotBtn} onClick={handleAddSlot}>
              <Text>+ 添加面试时段</Text>
            </View>
          </View>

          <View style={{ padding: '0 32rpx' }}>
            <View className={styles.submitBtn} onClick={handlePublishJob}>
              <Text>发布岗位</Text>
            </View>
          </View>

          {state.recruitJobs.length > 0 && (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>已发布岗位</Text>
              {state.recruitJobs.map(job => (
                <View key={job.id} className={styles.jobPreview}>
                  <Text className={styles.jobPreviewTitle}>{job.title}</Text>
                  <Text className={styles.jobPreviewMeta}>
                    {job.department} · {job.quota}人 · {job.interviewSlots.length}个面试时段 · {job.status === 'recruiting' ? '招聘中' : '已关闭'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default AdminPage;
