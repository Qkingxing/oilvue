import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
const api = {
  basic: '/wxPay/getBasic',
}
export default api
export function getBasic (parameter) {
  return JavaRequest({
    url: api.basic,
    method: 'post',
    data: parameter
  })
}