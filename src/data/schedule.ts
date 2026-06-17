import type { Activity, ScheduleShift } from '@/types';

export const activities: Activity[] = [
  {
    id: 'act001',
    title: '校园科技创新展',
    description: '一年一度的校园科技创新展，展示各社团最新科技成果，吸引了大量师生参观。',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '17:00',
    location: '大学生活动中心',
    organizer: '科技创新协会',
    status: 'upcoming',
    coverImage: 'https://picsum.photos/id/201/750/400',
    participantCount: 45,
    maxParticipants: 60
  },
  {
    id: 'act002',
    title: '编程马拉松',
    description: '48小时不间断编程挑战，激发创意，锻炼能力，打造产品。',
    date: '2024-10-20',
    startTime: '08:00',
    endTime: '20:00',
    location: '创新创业中心',
    organizer: '科技创新协会',
    status: 'upcoming',
    coverImage: 'https://picsum.photos/id/160/750/400',
    participantCount: 32,
    maxParticipants: 50
  },
  {
    id: 'act003',
    title: 'AI技术分享会',
    description: '邀请业界专家分享人工智能前沿技术与实践经验。',
    date: '2024-10-25',
    startTime: '19:00',
    endTime: '21:00',
    location: '学术报告厅',
    organizer: '科技创新协会',
    status: 'upcoming',
    coverImage: 'https://picsum.photos/id/119/750/400',
    participantCount: 78,
    maxParticipants: 100
  }
];

export const scheduleShifts: ScheduleShift[] = [
  {
    id: 'shift001',
    activityId: 'act001',
    activityTitle: '校园科技创新展',
    position: '入口接待',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '12:00',
    location: '活动中心正门',
    requiredCount: 3,
    assignedMembers: [
      { memberId: 'm007', memberName: '刘浩', avatar: 'https://picsum.photos/id/1025/200/200', status: 'assigned', isLeader: true },
      { memberId: 'm010', memberName: '郑小燕', avatar: 'https://picsum.photos/id/783/200/200', status: 'claimed', isLeader: false }
    ],
    description: '负责活动入口处的来宾签到、引导和咨询服务',
    hasConflict: false
  },
  {
    id: 'shift002',
    activityId: 'act001',
    activityTitle: '校园科技创新展',
    position: '展区讲解',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '12:00',
    location: '一楼展区A',
    requiredCount: 4,
    assignedMembers: [
      { memberId: 'm002', memberName: '李明', avatar: 'https://picsum.photos/id/91/200/200', status: 'assigned', isLeader: true },
      { memberId: 'm008', memberName: '周小雨', avatar: 'https://picsum.photos/id/718/200/200', status: 'assigned', isLeader: false },
      { memberId: 'm015', memberName: '马小龙', avatar: 'https://picsum.photos/id/1074/200/200', status: 'claimed', isLeader: false }
    ],
    description: '负责展区作品讲解和技术答疑',
    hasConflict: false
  },
  {
    id: 'shift003',
    activityId: 'act001',
    activityTitle: '校园科技创新展',
    position: '后勤保障',
    date: '2024-10-15',
    startTime: '13:00',
    endTime: '17:00',
    location: '活动中心',
    requiredCount: 2,
    assignedMembers: [
      { memberId: 'm013', memberName: '徐峰', avatar: 'https://picsum.photos/id/1005/200/200', status: 'assigned', isLeader: true }
    ],
    description: '负责物资管理、现场秩序维护和突发事件处理',
    hasConflict: true
  },
  {
    id: 'shift004',
    activityId: 'act001',
    activityTitle: '校园科技创新展',
    position: '摄影记录',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '12:00',
    location: '全场',
    requiredCount: 2,
    assignedMembers: [
      { memberId: 'm011', memberName: '黄凯', avatar: 'https://picsum.photos/id/1012/200/200', status: 'assigned', isLeader: true }
    ],
    description: '负责活动全程摄影摄像和后期素材整理',
    hasConflict: false
  },
  {
    id: 'shift005',
    activityId: 'act002',
    activityTitle: '编程马拉松',
    position: '技术支持',
    date: '2024-10-20',
    startTime: '08:00',
    endTime: '12:00',
    location: '创赛场地',
    requiredCount: 3,
    assignedMembers: [
      { memberId: 'm002', memberName: '李明', avatar: 'https://picsum.photos/id/91/200/200', status: 'assigned', isLeader: true },
      { memberId: 'm007', memberName: '刘浩', avatar: 'https://picsum.photos/id/1025/200/200', status: 'assigned', isLeader: false },
      { memberId: 'm008', memberName: '周小雨', avatar: 'https://picsum.photos/id/718/200/200', status: 'claimed', isLeader: false }
    ],
    description: '为参赛队伍提供技术咨询和问题解答',
    hasConflict: false
  },
  {
    id: 'shift006',
    activityId: 'act002',
    activityTitle: '编程马拉松',
    position: '赛事运营',
    date: '2024-10-20',
    startTime: '08:00',
    endTime: '20:00',
    location: '创赛场地',
    requiredCount: 4,
    assignedMembers: [
      { memberId: 'm003', memberName: '王芳', avatar: 'https://picsum.photos/id/338/200/200', status: 'assigned', isLeader: true },
      { memberId: 'm010', memberName: '郑小燕', avatar: 'https://picsum.photos/id/783/200/200', status: 'assigned', isLeader: false }
    ],
    description: '负责赛事签到、进度跟踪、评审组织等运营工作',
    hasConflict: false
  },
  {
    id: 'shift007',
    activityId: 'act003',
    activityTitle: 'AI技术分享会',
    position: '会场服务',
    date: '2024-10-25',
    startTime: '18:30',
    endTime: '21:00',
    location: '学术报告厅',
    requiredCount: 3,
    assignedMembers: [
      { memberId: 'm013', memberName: '徐峰', avatar: 'https://picsum.photos/id/1005/200/200', status: 'assigned', isLeader: true },
      { memberId: 'm012', memberName: '林美玲', avatar: 'https://picsum.photos/id/1014/200/200', status: 'claimed', isLeader: false }
    ],
    description: '负责会场布置、听众引导、互动环节协助',
    hasConflict: false
  }
];
