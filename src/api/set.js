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
//设置/支付设置/数据返回
function setPayastrictlist(parameter) {
  return PhpRequest({
    url: '/set/payastrictlist',
    method: 'post',
    data: parameter
  })
}
//设置/交易管理/支付设置
function setPayastrictset(parameter){
  return PhpRequest({
    url: '/set/payastrictset',
    method: 'post',
    data: parameter
  })
}
//设置/支付设置/退款信息返回
function setRefundastrictlist(parameter){
  return PhpRequest({
    url: 'set/refundastrictlist',
    method: 'post',
    data: parameter
  })
}
//设置/交易管理/退款限制
function setRefundastrictset(parameter){
  return PhpRequest({
    url: 'set/refundastrictset',
    method: 'post',
    data: parameter
  })
}
const api = {
  setIdentitylist,
  setIdentityset,
  setPayastrictlist,
  setPayastrictset,
  setRefundastrictlist,
  setRefundastrictset
}
export default api
