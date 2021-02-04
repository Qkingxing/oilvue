
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'


// 获取已有客户列表
export function getOldUserList (data) {
  return PhpRequest({
    url: '/user/userlist',
    method: 'post',
    data
  })
}
// 获取获取标签列表
export function getlabellist (data) {
  return PhpRequest({
    url: '/user/labellist',
    method: 'post',
    data: {
      site_id: store.getters.site_id,
      ...data
    }
  })
}
// 新增或修改客户标签
export function labelsave (data) {
  return PhpRequest({
    url: '/user/labelsave',
    method: 'post',
    data
  })
}
// 删除客户标签，可批量
export function labeldel (id) {
  return PhpRequest({
    url: '/user/labeldel',
    method: 'post',
    data:{id}
  })
}
// 客户标签详情
export function getLabeldetails (data) {
  return PhpRequest({
    url: '/user/labeldetails',
    method: 'post',
    data
  })
}
// 获取客户分群列表
export function getGroupinglist (data) {
  return JavaRequest({
    url: '/customer/getGrouping',
    method: 'post',
    data
  })
}

// 新增会员基础设置或修改
export function postBasicsset (data) {
  return PhpRequest({
    url: '/user/basicsset',
    method: 'post',
    data
  })
}
// 会员基础设置列表
export function getUserBasicslist (data) {
  return PhpRequest({
    url: '/user/basicslist',
    method: 'post',
    data
  })
}
// 固定等级会员列表
export function queryFixedLevel (data) {
  return JavaRequest({
    url: '/customer/queryFixedLevel',
    method: 'post',
    data
  })
}
// 查询动态等级信息
export function queryMemberSpalevel (data) {
  return JavaRequest({
    url: '/customer/queryMemberSpalevel',
    method: 'post',
    data
  })
}
// 获取积分设置
export function getIntegrallist () {
  return PhpRequest({
    url: '/user/integrallist',
    method: 'post',
    data: {
      group_id: store.getters.group_id,
      site_id: store.getters.site_id
    }
  })
}
// 享受优惠不可获积分列表
export function getCannotintegral () {
  return PhpRequest({
    url: '/user/cannotintegral',
    method: 'post'
  })
}
// 提交积分设置
export function postIntegralset (data) {
  return PhpRequest({
    url: '/user/integralset',
    method: 'post',
    data
  })
}