import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
const api = {
  getlevelAlls: '/user/getlevelAlls',
}
export default api
export function getlevelAlls (parameter) {
  return PhpRequest({
    url: api.getlevelAlls,
    method: 'post',
    data: parameter
  })
}