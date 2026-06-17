import type { RecruitJob, ApplicationRecord, InterviewSlot } from '@/types';

const interviewSlots: InterviewSlot[] = [
  {
    id: 'slot1',
    date: '2024-09-15',
    startTime: '14:00',
    endTime: '15:00',
    location: '教学楼A栋301',
    capacity: 10,
    bookedCount: 6
  },
  {
    id: 'slot2',
    date: '2024-09-15',
    startTime: '15:30',
    endTime: '16:30',
    location: '教学楼A栋301',
    capacity: 10,
    bookedCount: 8
  },
  {
    id: 'slot3',
    date: '2024-09-16',
    startTime: '14:00',
    endTime: '15:00',
    location: '教学楼A栋302',
    capacity: 10,
    bookedCount: 4
  },
  {
    id: 'slot4',
    date: '2024-09-16',
    startTime: '19:00',
    endTime: '20:00',
    location: '教学楼A栋302',
    capacity: 10,
    bookedCount: 9
  }
];

export const recruitJobs: RecruitJob[] = [
  {
    id: 'job001',
    title: '前端开发工程师',
    department: '技术部',
    departmentId: 'dept001',
    description: '负责社团官网、小程序等前端项目的开发和维护工作，参与产品需求讨论和技术方案设计。',
    requirements: [
      '熟悉 HTML/CSS/JavaScript 基础知识',
      '了解 React 或 Vue 等主流前端框架',
      '有良好的代码规范和学习能力',
      '有相关项目经验者优先'
    ],
    benefits: [
      '系统的前端技术培训',
      '参与真实项目开发',
      '结识志同道合的伙伴',
      '社团年度优秀成员评选资格'
    ],
    quota: 6,
    appliedCount: 28,
    status: 'recruiting',
    interviewSlots: interviewSlots,
    publishDate: '2024-09-01',
    deadline: '2024-09-14'
  },
  {
    id: 'job002',
    title: '后端开发工程师',
    department: '技术部',
    departmentId: 'dept001',
    description: '负责社团各类项目的后端服务开发，包括API设计、数据库设计、服务部署等工作。',
    requirements: [
      '熟悉至少一种后端语言（Java/Python/Node.js等）',
      '了解 MySQL、MongoDB 等数据库',
      '有良好的逻辑思维和问题解决能力',
      '有服务器部署经验者优先'
    ],
    benefits: [
      '全栈技术视野培养',
      '云服务器资源支持',
      '技术大牛一对一指导',
      '丰富的项目实践机会'
    ],
    quota: 5,
    appliedCount: 19,
    status: 'recruiting',
    interviewSlots: interviewSlots,
    publishDate: '2024-09-01',
    deadline: '2024-09-14'
  },
  {
    id: 'job003',
    title: '活动策划专员',
    department: '策划部',
    departmentId: 'dept002',
    description: '负责社团各类活动的策划与执行，包括科技竞赛、工作坊、讲座等活动的全流程跟进。',
    requirements: [
      '有创意，喜欢策划活动',
      '具备良好的沟通协调能力',
      '做事认真负责，有团队精神',
      '有学生工作经验者优先'
    ],
    benefits: [
      '活动策划能力系统培养',
      '独立策划活动的机会',
      '拓宽人脉圈子',
      '丰富的综测加分'
    ],
    quota: 8,
    appliedCount: 35,
    status: 'recruiting',
    interviewSlots: interviewSlots,
    publishDate: '2024-09-02',
    deadline: '2024-09-15'
  },
  {
    id: 'job004',
    title: '视觉设计专员',
    department: '宣传部',
    departmentId: 'dept003',
    description: '负责社团宣传物料的设计制作，包括海报、公众号配图、活动周边等视觉内容的设计。',
    requirements: [
      '熟练使用 Photoshop、Figma 等设计工具',
      '有良好的审美和设计感',
      '有海报设计或UI设计经验',
      '有自己的作品集优先'
    ],
    benefits: [
      '专业设计能力提升',
      '作品署名展示机会',
      '设计软件正版授权',
      '创意项目参与资格'
    ],
    quota: 4,
    appliedCount: 22,
    status: 'recruiting',
    interviewSlots: interviewSlots,
    publishDate: '2024-09-02',
    deadline: '2024-09-15'
  },
  {
    id: 'job005',
    title: '新媒体运营专员',
    department: '宣传部',
    departmentId: 'dept003',
    description: '负责社团公众号、视频号等新媒体平台的日常运营，包括内容编辑、粉丝互动、数据分析等。',
    requirements: [
      '熟悉微信公众号、微博等平台运营',
      '有一定的文字功底和内容创作能力',
      '了解基础的排版工具',
      '有运营经验者优先'
    ],
    benefits: [
      '新媒体运营实战经验',
      '内容创作能力培养',
      '数据运营思维训练',
      '官方账号运营权限'
    ],
    quota: 3,
    appliedCount: 16,
    status: 'recruiting',
    interviewSlots: interviewSlots,
    publishDate: '2024-09-03',
    deadline: '2024-09-16'
  }
];

export const myApplications: ApplicationRecord[] = [
  {
    id: 'app001',
    jobId: 'job001',
    jobTitle: '前端开发工程师',
    department: '技术部',
    name: '王小朋',
    studentId: '2023001001',
    phone: '13800138001',
    email: 'xiaopeng@example.com',
    grade: '大二',
    major: '计算机科学与技术',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    introduction: '热爱前端开发，自学了一年的前端知识，做过几个小项目。希望能加入技术部，和大家一起学习进步。',
    interviewSlotId: 'slot1',
    interviewSlotInfo: '9月15日 14:00-15:00 教学楼A栋301',
    status: 'approved',
    submitDate: '2024-09-05',
    feedback: '恭喜你通过面试！请于9月20日前加入技术部迎新群。'
  },
  {
    id: 'app002',
    jobId: 'job003',
    jobTitle: '活动策划专员',
    department: '策划部',
    name: '王小朋',
    studentId: '2023001001',
    phone: '13800138001',
    email: 'xiaopeng@example.com',
    grade: '大二',
    major: '计算机科学与技术',
    skills: ['活动策划', '文案写作', '团队协作'],
    introduction: '大一在班级担任文体委员，组织过多次班级活动。对策划工作很感兴趣，希望能加入策划部锻炼自己。',
    interviewSlotId: 'slot3',
    interviewSlotInfo: '9月16日 14:00-15:00 教学楼A栋302',
    status: 'interview',
    submitDate: '2024-09-06'
  }
];
