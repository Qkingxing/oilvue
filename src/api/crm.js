
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

// 会员基础设置列表
export function getUserBasicslist (data) {
  return PhpRequest({
    url: 'user/basicslist',
    method: 'post',
    data
  })
}
