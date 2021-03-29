import request from '@/utils/request'
import PhpRequest from '@/utils/PhpRequest'
import JavaRequest from '@/utils/JavaRequest'
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
//油品挂牌价-列表
function setSiteoillist(parameter){
  return PhpRequest({
    url: 'set/siteoillist',
    method: 'post',
    data: parameter
  })
}
//获取油品列表
function setOillist(parameter){
  return PhpRequest({
    url: 'set/oillist',
    method: 'post',
    data: parameter
  })
}
//油品挂牌价-新增编辑
function setSiteoilsave(parameter){
  return PhpRequest({
    url: 'set/siteoilsave',
    method: 'post',
    data: parameter
  })
}
//油枪配置-列表
function seTgunlist(parameter){
  return PhpRequest({
    url: 'set/gunlist',
    method: 'post',
    data: parameter
  })
}
//油枪配置-新增编辑
function orderAddGun_Oils_list(parameter){
  return JavaRequest({
    url: 'order/addGun_Oils_list',
    method: 'post',
    data: parameter
  })
}

// //油枪分类--新增编辑删除查询
function orderAddOil_gun_sort(parameter){
  return JavaRequest({
    url: 'order/addOil_gun_sort',
    method: 'post',
    data: parameter
  })
}
// 油枪配置-删除可批量
function setGundel(parameter){
  return PhpRequest({
    url: 'set/gundel',
    method: 'post',
    data: parameter
  })
}
//油枪配置-新增编辑
function userGetProvince(parameter){
  return JavaRequest({
    url: 'user/getProvince',
    method: 'post',
    data: parameter
  })
}
//set/basicsset
//基础信息
function setBasicslist(parameter){
  return PhpRequest({
    url: 'set/basicslist',
    method: 'post',
    data: parameter
  })
}
function setBasicsset(parameter){
  return PhpRequest({
    url: 'set/basicsset',
    method: 'post',
    data: parameter
  })
}
const api = {
  setBasicsset,
  setBasicslist,
  userGetProvince,
  orderAddGun_Oils_list,
  orderAddOil_gun_sort,
  setGundel,
  seTgunlist,
  setSiteoilsave,
  setOillist,
  setSiteoillist,
  setIdentitylist,
  setIdentityset,
  setPayastrictlist,
  setPayastrictset,
  setRefundastrictlist,
  setRefundastrictset
}
export default api
