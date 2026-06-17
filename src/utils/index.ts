export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};

export const formatFullDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: '待审核',
    approved: '已通过',
    rejected: '未通过',
    interview: '面试中',
    active: '活跃',
    inactive: '不活跃',
    read: '已读',
    leave: '请假',
    unconfirmed: '未确认',
    recruiting: '招聘中',
    closed: '已结束',
    upcoming: '即将开始',
    ongoing: '进行中',
    completed: '已结束',
    conflict: '有冲突'
  };
  return statusMap[status] || status;
};

export const getNotificationTypeText = (type: string): string => {
  const typeMap: Record<string, string> = {
    activity: '活动通知',
    recruit: '招新通知',
    system: '系统通知',
    schedule: '排班通知'
  };
  return typeMap[type] || type;
};
