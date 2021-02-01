import request from '@/utils/request'
import PhpRequest from '@/utils/PhpRequest'
//身份信息返回列表
function setIdentitylist (parameter) {
    return PhpRequest({
      url: '/set/identitylist',
      method: 'post',
      data: parameter
    })
}
//身份设置信息添加/修改
function setIdentityset(parameter) {
  return PhpRequest({
    url: '/set/identityset',
    method: 'post',
    data: parameter
  })
}
const api = {
  setIdentitylist,
  setIdentityset
}
export default api
