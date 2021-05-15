import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 优惠券列表
export function getCoupons (data) {
  return JavaRequest({
    url: '/coupons/getCoupons',
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

