import request from '@/utils/request'

const api = {
  goodsList: '/goods/list',
}

export default api

export function getGoodsList (parameter) {
  return request({
    url: api.goodsList,
    method: 'post',
    data: parameter
  })
}