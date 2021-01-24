import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
const api = {
  goodsList: '/goods/getManagement',
  goodsCategoryList: '/goods/list',
  addGoodsCategory:'/goods/Convenience',
  modifyGoodsCategory:'/goods/updateCategory',
  deleteGoodsCategory:'/goods/delCategory',
  modifyGoodsSorting:'/goods/updateSorting',
  addGoods:'/goods/addGoodsManagement',
  getCouponsList:'/coupons/getCoupons',
  deleteGoods:'/goods/delManagement',
  modifyGoods:'/goods/updateManagement',
  modifyGoodsState:'/goods/updateState'
}
export default api
export function modifyGoods (parameter) {
  return JavaRequest({
    url: api.modifyGoods,
    method: 'post',
    data: parameter
  })
}
export function modifyGoodsState (parameter) {
  return JavaRequest({
    url: api.modifyGoodsState,
    method: 'post',
    data: parameter
  })
}
export function deleteGoods (parameter) {
  return JavaRequest({
    url: api.deleteGoods,
    method: 'post',
    data: parameter
  })
}
export function addGoods (parameter) {
  return JavaRequest({
    url: api.addGoods,
    method: 'post',
    data: parameter
  })
}
export function getCouponsList (parameter) {
  return JavaRequest({
    url: api.getCouponsList,
    method: 'post',
    data: parameter
  })
}
export function getGoodsCategoryList (parameter) {
  return JavaRequest({
    url: api.goodsCategoryList,
    method: 'post',
    data: parameter
  })
}
export function addGoodsCategory (parameter) {
  return JavaRequest({
    url: api.addGoodsCategory,
    method: 'post',
    data: parameter
  })
}
export function modifyGoodsCategory(parameter){
  return JavaRequest({
    url: api.modifyGoodsCategory,
    method: 'post',
    data: parameter
  })
}
export function deleteGoodsCategory(parameter){
  return JavaRequest({
    url: api.deleteGoodsCategory,
    method: 'post',
    data: parameter
  })
}
export function getGoodsList (parameter) {
  return JavaRequest({
    url: api.goodsList,
    method: 'post',
    data: parameter
  })
}
export function modifyGoodsCategorySorting (parameter) {
  return JavaRequest({
    url: api.modifyGoodsSorting,
    method: 'post',
    data: parameter
  })
}