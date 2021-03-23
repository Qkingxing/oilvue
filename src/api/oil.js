import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'


// 油品挂牌价-列表
// 获取油品列表
export function getSiteoillist () {
  let data = {}
  if (store.getters.site_id!==(-1)) {
    data.site_id = store.getters.site_id
  }
  return PhpRequest({
    url: '/set/siteoillist',
    method: 'post',
    data
  })
}

// 获取某油站下油品列表（可查询多个油站）
export function getSitesoillist (site_ids) {
  return PhpRequest({
    url: '/set/sitesoillist',
    method: 'post',
    data: {site_ids}
  })
}