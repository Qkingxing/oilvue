import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
import store from '@/store'
const api = {
  basic: '/wxPay/getBasic'
}
export default api
export function getBasic () {
  const data = new FormData()
  if (store.getters.site_id === (-1)) {
    data.append('group_id', store.getters.group_id)
  } else {
    data.append('site_id', store.getters.site_id)
  }
  return JavaRequest({
    url: api.basic,
    method: 'post',
    data
  })
}
