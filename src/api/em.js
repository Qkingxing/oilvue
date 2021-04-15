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

