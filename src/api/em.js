import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 活动列表(详情通过id区分)
export function getActivitlist (data) {
  return PhpRequest({
    url: '/activity/activitlist',
    method: 'post',
    data
  })
}
// 优惠券列表
export function getCoupons (data) {
  return JavaRequest({
    url: '/coupons/getCoupons',
    method: 'post',
    data
  })
}
// 优惠券详情
export function getCouponDefault (id) {
  return PhpRequest({
    url: '/user/couponDefault',
    method: 'post',
    data: {id}
  })
}
// 修改优惠券时间
export function setCouponUpdateTime (data) {
  return PhpRequest({
    url: '/user/couponUpdateTime',
    method: 'post',
    data
  })
}
// 删除优惠券
export function delCoupons (id) {
  return JavaRequest({
    url: '/coupons/delCoupons',
    method: 'post',
    data: {id}
  })
}
// 激活优惠券
export function updateCoupons (id) {
  return JavaRequest({
    url: '/coupons/updateCoupons',
    method: 'post',
    data: {
      id,
      activation_type: 1
    }
  })
}
// 1营销活动--价立减--新增
export function activitsave (data) {
  return PhpRequest({
    url: '/activity/activitsave',
    method: 'post',
    data
  })
}
// 校验活动是否有冲突
export function activitCheck (data) {
  return PhpRequest({
    url: '/activity/activitCheck',
    method: 'post',
    data
  })
}
// 修改活动时间
// end_time
// id
export function handleTimeIn (data) {
  return PhpRequest({
    url: '/activity/handleTimeIn',
    method: 'post',
    data
  })
}
// 删除活动
export function activitdel (id) {
  return PhpRequest({
    url: '/activity/activitdel',
    method: 'post',
    data: {id}
  })
}

