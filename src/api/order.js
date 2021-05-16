import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'
const api = {
  orderList: '/order/getOrder',
  oilSet: '/set/siteoillist',
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

export function getOilSetList () {
  const data = new FormData()
  if (store.getters.site_id == (-1)) {
    data.append('group_id', store.getters.group_id)
  } else {
    data.append('site_id', store.getters.site_id)
  }
  return PhpRequest({
    url: api.oilSet,
    method: 'post',
    data
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
