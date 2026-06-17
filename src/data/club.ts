import type { ClubInfo, Department } from '@/types';

export const clubInfo: ClubInfo = {
  id: 'club001',
  name: '科技创新协会',
  logo: 'https://picsum.photos/id/3/200/200',
  description: '科技创新协会成立于2015年，是学校最具影响力的科技类社团之一。我们致力于为对科技创新感兴趣的同学提供交流和实践平台，组织各类科技竞赛、创新工坊和学术讲座活动。',
  slogan: '创新驱动未来，科技改变世界',
  memberCount: 128,
  departmentCount: 5,
  activityCount: 36,
  establishDate: '2015-09-01',
  president: '张明辉',
  contact: '13800138000',
  departments: [
    {
      id: 'dept001',
      name: '技术部',
      description: '负责社团技术研发和项目开发',
      memberCount: 35,
      leader: '李明'
    },
    {
      id: 'dept002',
      name: '策划部',
      description: '负责活动策划和组织执行',
      memberCount: 25,
      leader: '王芳'
    },
    {
      id: 'dept003',
      name: '宣传部',
      description: '负责社团品牌建设和宣传推广',
      memberCount: 20,
      leader: '赵丽'
    },
    {
      id: 'dept004',
      name: '外联部',
      description: '负责对外联络和资源对接',
      memberCount: 18,
      leader: '陈强'
    },
    {
      id: 'dept005',
      name: '行政部',
      description: '负责社团日常运营和人事管理',
      memberCount: 30,
      leader: '孙悦'
    }
  ]
};

export const quickEntries = [
  {
    id: 'entry1',
    title: '招新报名',
    desc: '加入我们',
    color: '#2563eb',
    page: '/pages/recruit/index'
  },
  {
    id: 'entry2',
    title: '活动排班',
    desc: '查看值班',
    color: '#10b981',
    page: '/pages/schedule/index'
  },
  {
    id: 'entry3',
    title: '成员名册',
    desc: '认识伙伴',
    color: '#8b5cf6',
    page: '/pages/members/index'
  },
  {
    id: 'entry4',
    title: '通知中心',
    desc: '重要消息',
    color: '#f59e0b',
    page: '/pages/notifications/index'
  }
];
