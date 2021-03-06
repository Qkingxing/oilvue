import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 获取当前登陆账号人员的身份信息
export function getUserInfo() {
  return PhpRequest({
    url: '/work/userinfo',
    method: 'post',
    data: {}
  })
}
// 切换权限
export function SwitchPermission(site_id) {
  return PhpRequest({
    url: '/work/switchPermission',
    method: 'post',
    data: {
      site_id
    }
  })
}


// 获取销售明细
export function getSelldetailList(data) {
  return PhpRequest({
    url: '/order/getoilorder',
    method: 'post',
    data
  })
}
// 获取汇总统计

export function getClassOrderList(data) {
  return PhpRequest({
    url: '/order/getclassorder',
    method: 'post',
    data
  })
}