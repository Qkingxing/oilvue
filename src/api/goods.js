import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
const api = {
  goodsList: '/goods/list',
}
export default api

export function getGoodsList (parameter) {
  return JavaRequest({
    url: api.goodsList,
    method: 'post',
    data: parameter
  })
}