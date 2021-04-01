import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

const api = {
  getlevelAlls: '/user/getlevelAlls',
}
export default api
// 等级下拉框，type,1,固定等级，2，动态等级
export function getlevelAlls (data) {
  return PhpRequest({
    url: api.getlevelAlls,
    method: 'post',
    data
  })
}