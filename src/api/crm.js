
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'


// 获取已有客户列表
export function getOldUserList (data) {
  return PhpRequest({
    url: '/user/userlist',
    method: 'post',
    data
  })
}
// 会员基础设置列表
export function getUserBasicslist (data) {
  return PhpRequest({
    url: '/user/basicslist',
    method: 'post',
    data
  })
}
// 固定等级会员列表
export function queryFixedLevel (data) {
  return JavaRequest({
    url: '/customer/queryFixedLevel',
    method: 'post',
    data
  })
}
// 查询动态等级信息
export function queryMemberSpalevel (data) {
  return JavaRequest({
    url: '/customer/queryMemberSpalevel',
    method: 'post',
    data
  })
}