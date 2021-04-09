import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'


// export function getSonoillist () {
//   return PhpRequest({
//     url: '/user/sonoillist',
//     method: 'post',
//     data: {
//       site_id: store.getters.site_id
//     }
//   })
// }
// 获取支付方式下拉
export function getPayList () {
  return JavaRequest({
    url: '/user/getPayList',
    method: 'post',
  })
}

