import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 获取偏爱的油品下拉
export function addCoupons (data) {
  return JavaRequest({
    url: '/coupons/AddCoupons',
    method: 'post',
    data
  })
}
