import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
const api = {
  orderList: '/order/getOrder',
  oilSet: '/order/queryOilSet',
  gun: '/order/queryGun',
  payList: '/order/queryPayList'
}
export default api
export function getOrderList (parameter) {
  return JavaRequest({
    url: api.orderList,
    method: 'post',
    data: parameter
  })
}

export function getOilSetList (parameter) {
  return JavaRequest({
    url: api.oilSet,
    method: 'post',
    data: parameter
  })
}

export function getGunList (parameter) {
  return JavaRequest({
    url: api.gun,
    method: 'post',
    data: parameter
  })
}

export function getPayList (parameter) {
  return JavaRequest({
    url: api.payList,
    method: 'post',
    data: parameter
  })
}

export function getDepotslist (parameter) {
  return PhpRequest({
    url: '/work/depotslist',
    method: 'post',
    data: parameter
  })
}
