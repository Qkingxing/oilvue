import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
const api = {
  orderList: '/order/getOrder',
}
export default api
export function getOrderList (parameter) {
  return JavaRequest({
    url: api.orderList,
    method: 'post',
    data: parameter
  })
}