import type { Notification, ConfirmRecord } from '@/types';

export const notifications: Notification[] = [
  {
    id: 'notif001',
    title: '【重要】校园科技创新展排班通知',
    content: '各位成员请注意，校园科技创新展将于10月15日举行，请已报名值班的同学准时到岗。值班时间为上午9:00-12:00，下午13:00-17:00。请大家提前15分钟到达活动中心正门集合签到。如有特殊情况无法参加请提前请假。',
    type: 'schedule',
    publishDate: '2024-10-10 14:30',
    publisher: '行政部',
    isRead: false,
    needConfirm: true,
    confirmDeadline: '2024-10-12 18:00',
    stats: {
      total: 128,
      readCount: 86,
      leaveCount: 5,
      unconfirmedCount: 37
    }
  },
  {
    id: 'notif002',
    title: '2024秋季招新结果公示',
    content: '经过严格的面试和筛选，2024秋季招新结果已出。恭喜所有被录取的新成员！请新成员于本周日（9月22日晚19:00到大学生活动中心参加迎新大会。未被录取的同学也不要气馁，期待下次招新我们再相见。',
    type: 'recruit',
    publishDate: '2024-09-18 10:00',
    publisher: '行政部',
    isRead: true,
    needConfirm: false,
    stats: {
      total: 200,
      readCount: 185,
      leaveCount: 0,
      unconfirmedCount: 15
    }
  },
  {
    id: 'notif003',
    title: '编程马拉松活动报名开始',
    content: '一年一度的编程马拉松活动开始报名啦！48小时不间断编程挑战，丰厚奖品等你来拿。报名时间：10月8日-10月15日。组队参赛，每队2-4人。欢迎对编程感兴趣的同学踊跃报名参加！',
    type: 'activity',
    publishDate: '2024-10-08 09:00',
    publisher: '策划部',
    isRead: true,
    needConfirm: false,
    stats: {
      total: 128,
      readCount: 102,
      leaveCount: 0,
      unconfirmedCount: 26
    }
  },
  {
    id: 'notif004',
    title: '【系统维护通知',
    content: '为提升系统使用体验，我们将于本周六凌晨2:00-4:00进行系统维护升级。维护期间部分功能可能无法正常使用，请大家提前做好相关工作安排。给您带来的不便敬请谅解。',
    type: 'system',
    publishDate: '2024-10-11 16:20',
    publisher: '技术部',
    isRead: false,
    needConfirm: false,
    stats: {
      total: 128,
      readCount: 64,
      leaveCount: 0,
      unconfirmedCount: 64
    }
  },
  {
    id: 'notif005',
    title: 'AI技术分享会嘉宾确认',
    content: 'AI技术分享会将于10月25日晚19:00在学术报告厅举行。本次邀请到了业界知名AI专家担任主讲。请确认参加的同学准时到场，现场有精美礼品赠送。',
    type: 'activity',
    publishDate: '2024-10-12 11:00',
    publisher: '策划部',
    isRead: false,
    needConfirm: true,
    confirmDeadline: '2024-10-20 23:59',
    stats: {
      total: 128,
      readCount: 45,
      leaveCount: 8,
      unconfirmedCount: 75
    }
  }
];

export const confirmRecords: ConfirmRecord[] = [
  {
    id: 'cr001',
    notificationId: 'notif001',
    memberId: 'm001',
    memberName: '张明辉',
    avatar: 'https://picsum.photos/id/64/200/200',
    status: 'read',
    confirmTime: '2024-10-10 15:30'
  },
  {
    id: 'cr002',
    notificationId: 'notif001',
    memberId: 'm002',
    memberName: '李明',
    avatar: 'https://picsum.photos/id/91/200/200',
    status: 'read',
    confirmTime: '2024-10-10 16:00'
  },
  {
    id: 'cr003',
    notificationId: 'notif001',
    memberId: 'm003',
    memberName: '王芳',
    avatar: 'https://picsum.photos/id/338/200/200',
    status: 'read',
    confirmTime: '2024-10-10 14:45'
  },
  {
    id: 'cr004',
    notificationId: 'notif001',
    memberId: 'm007',
    memberName: '刘浩',
    avatar: 'https://picsum.photos/id/1025/200/200',
    status: 'leave',
    confirmTime: '2024-10-11 09:20',
    leaveReason: '当天有专业课考试，无法参加'
  },
  {
    id: 'cr005',
    notificationId: 'notif001',
    memberId: 'm008',
    memberName: '周小雨',
    avatar: 'https://picsum.photos/id/718/200/200',
    status: 'read',
    confirmTime: '2024-10-10 20:15'
  },
  {
    id: 'cr006',
    notificationId: 'notif001',
    memberId: 'm009',
    memberName: '吴迪',
    avatar: 'https://picsum.photos/id/237/200/200',
    status: 'unconfirmed'
  },
  {
    id: 'cr007',
    notificationId: 'notif001',
    memberId: 'm010',
    memberName: '郑小燕',
    avatar: 'https://picsum.photos/id/783/200/200',
    status: 'read',
    confirmTime: '2024-10-11 10:30'
  },
  {
    id: 'cr008',
    notificationId: 'notif001',
    memberId: 'm011',
    memberName: '黄凯',
    avatar: 'https://picsum.photos/id/1012/200/200',
    status: 'leave',
    confirmTime: '2024-10-11 14:00',
    leaveReason: '家里有事，需要请假'
  },
  {
    id: 'cr009',
    notificationId: 'notif001',
    memberId: 'm013',
    memberName: '徐峰',
    avatar: 'https://picsum.photos/id/1005/200/200',
    status: 'read',
    confirmTime: '2024-10-10 18:00'
  },
  {
    id: 'cr010',
    notificationId: 'notif001',
    memberId: 'm015',
    memberName: '马小龙',
    avatar: 'https://picsum.photos/id/1074/200/200',
    status: 'unconfirmed'
  }
];
