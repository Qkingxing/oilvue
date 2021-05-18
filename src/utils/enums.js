// 积分记录-类型
export const typeList = [
  { text: '消费积分', value: 1 },
  { text: '手动增加', value: 2 },
  { text: '退款', value: 3 },
  { text: '订单取消', value: 4 },
  { text: '导入', value: 5 },
  { text: '活动获取', value: 6 },
  { text: '过期', value: 7 },
  { text: '手动减少', value: 8 },
]
// 客户身份
export const identitySelect = [
  { label: '全部', value: 0 },
  { label: '物流车/商用车', value: 1 },
  { label: '专快车/顺风车', value: 2 },
  { label: '私家车', value: 3 },
  { label: '出租车', value: 4 },
]
// 订单状态
export const orderStatus = [
  { label: '已支付', value: 1 },
  { label: '待支付', value: 2 },
  { label: '支付失败', value: 3 },
]
// 优惠券获取途径
export const way_type = [
  { label: '人工发放', value: 1 },
  { label: '用户购买', value: 2 },
  { label: '满额送', value: 3 },
  { label: '抽奖', value: 4 },
  { label: '好友邀请', value: 5 },
]
// 优惠券获取途径
export const IntegralHistoryType = [
  { label: '消费积分', value: 1 },
  { label: '手动增加', value: 2 },
  { label: '退款', value: 3 },
  { label: '订单取消', value: 4 },
  { label: '导入', value: 5 },
  { label: '活动获取', value: 6 },
  { label: '过期', value: 7 },
  { label: '手动减少', value: 8 },
]
// 身份类型
export const identity_types = [
  { label: '无', value: 0 },
  { label: '身份已认证', value: 1 },
  { label: '加油卡', value: 2 },
  { label: '会员', value: 3 },
]
// 活动类型
export const activeType = [
  { label: '价立减', value: 1 },
  { label: '满额送', value: 2 },
  { label: '满额减', value: 3 },
  { label: '红包', value: 4 },
  { label: '幸运抽奖', value: 5 },
  { label: '好友邀请', value: 6 },
  { label: '积分抵充值', value: 7 },
]
// 客户列表 列配置
export const oldcolumns = [
  {
    title: '客户编号',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' },
    fixed: 'left',
    key: 'id',
    disabled: true,
    show: true,
    default: true,
  },
  {
    title: '客户子编号',
    dataIndex: 'sonnumber',
    scopedSlots: { customRender: 'sonnumber' },
    fixed: 'left',
    key: 'sonnumber',
    disabled: true,
    show: true,
    default: true,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    fixed: 'left',
    key: 'mobile',
    disabled: true,
    show: true,
    default: true,
  },
  {
    title: '偏好油品',
    dataIndex: 'name',
    key: 'name',
    disabled: true,
    show: true,
    default: true,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    show: true,
    default: true,
  },
  {
    title: '是否消费油品',
    dataIndex: 'is_consumption',
    key: 'is_consumption',
    show: true,
    default: true,
  },
  {
    title: '加油升数',
    dataIndex: 'l_number',
    key: 'l_number',
    show: true,
    default: true,
  },
  {
    title: '加油次数',
    dataIndex: 'l_count',
    key: 'l_count',
    show: true,
    default: true,
  },
  {
    title: '最近加油时间',
    show: false,
    default: true,
    dataIndex: 'last_time',
    key: 'last_time',
  },
  {
    title: '偏好油品',
    show: false,
    default: true,
    //   dataIndex: 'name',
    //   key: 'name',
  },
  {
    title: '会员等级',
    show: false,
    default: true,
    //   dataIndex: 'level_id',
    //   key: 'level_id',
  },
  {
    title: '现有积分',
    show: false,
    default: true,
    //   dataIndex: 'integral',
    //   key: 'integral',
  },
  {
    title: '加油卡余额',
    show: false,
    default: true,
    //   dataIndex: 'money',
    //   key: 'money',
  },
  {
    title: '客户身份',
    show: false,
    default: true,
    //   dataIndex: 'type',
    //   key: 'type',
  },
  {
    title: '车牌号',
    show: false,
    default: true,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近30天消费金额',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近60天消费金额',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近30天消费升数',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近60天消费升数',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近30天消费次数',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '近60天消费次数',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },
  {
    title: '注册时间',
    show: false,
    //   dataIndex: 'plate_number',
    //   key: 'plate_number',
  },

]
