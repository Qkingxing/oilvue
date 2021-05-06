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
// 充值记录
export function getMoneyTransfer(parameter) {
  return JavaRequest({
    url: '/wxPay/getMoneyTransfer',
    method: 'post',
     data: parameter
  })
}
// 微信支付
export function wxPay(parameter) {
  let _url = ''
  if (store.getters.site_id === (-1)) {
    _url = '/wxPay/pay?money='+parameter.money+'&body=账户充值&uid='+store.getters.userId+'&group_id=' + store.getters.group_id
  } else {
    _url = '/wxPay/pay?money='+parameter.money+'&body=账户充值&uid='+store.getters.userId+'&site_id=' + store.getters.site_id
  }
  return JavaRequest({
    url: _url,
    method: 'get',
    responseType: 'blob'
  })
}
