export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/recruit/index',
    'pages/members/index',
    'pages/schedule/index',
    'pages/notifications/index',
    'pages/recruit-detail/index',
    'pages/member-detail/index',
    'pages/schedule-detail/index',
    'pages/notification-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '校园社团',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#2563eb',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/recruit/index',
        text: '招新'
      },
      {
        pagePath: 'pages/members/index',
        text: '成员'
      },
      {
        pagePath: 'pages/schedule/index',
        text: '排班'
      },
      {
        pagePath: 'pages/notifications/index',
        text: '通知'
      }
    ]
  }
})
