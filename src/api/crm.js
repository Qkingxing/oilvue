import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'

// 获取偏爱的油品下拉
export function getSonoillist () {
  return PhpRequest({
    url: '/user/sonoillist',
    method: 'post',
    data: {
      site_id: store.getters.site_id
    }
  })
}
// 获取偏爱油站下拉
export function getSonsitelist () {
  return PhpRequest({
    url: '/user/sonsitelist',
    method: 'post'
  })
}
// 获取会员等级下拉
export function getlevelAll () {
  return PhpRequest({
    url: '/user/getlevelAll',
    method: 'post'
  })
}
// 获取已有客户列表
export function getOldUserList (data) {
  return PhpRequest({
    url: '/user/userlist',
    method: 'post',
    data
  })
}
// 获取新增客户列表
export function getNewUserList (data) {
  return PhpRequest({
    url: '/user/newuserlist',
    method: 'post',
    data
  })
}
// 获取客户详情
export function getUserdefault (data) {
  return PhpRequest({
    url: '/user/userdefault',
    method: 'post',
    data
  })
}
// 给客户修改用户等级（只能修改固定等级）
export function levelsave (data) {
  return PhpRequest({
    url: '/user/levelsave',
    method: 'post',
    data
  })
}
// 给客户发优惠券
export function SendCoupon (data) {
  return PhpRequest({
    url: '/user/SendCoupon',
    method: 'post',
    data
  })
}
// 查询客户加油卡
export function getUserCard (user_id) {
  return PhpRequest({
    url: '/user/userCard',
    method: 'post',
    data: {user_id}
  })
}

// 查询客户消费记录
export function getUserConsumptionHistory (data) {
  return JavaRequest({
    url: '/order/getOrder',
    method: 'post',
    data
  })
}
// 查询客户优惠券记录
export function getUserCouponHistory(data) {
  return JavaRequest({
    url: '/customer/coupon_record_identity',
    method: 'post',
    data
  })
}
// 查询客户积分记录
export function getUserIntegralHistory(data) {
  return PhpRequest({
    url: '/user/getuserintegrallist',
    method: 'post',
    data
  })
}
// 查询客户加油卡记录
export function getUserCheckrecordsHistory(data) {
  return PhpRequest({
    url: '/user/checkrecords',
    method: 'post',
    data
  })
}
// 查询客户身份认证记录
export function getUserAuthenticationHistory(data) {
  return JavaRequest({
    url: '/customer/query_authentication',
    method: 'post',
    data
  })
}
// 客户标签下拉框（仅限油站）
export function querylabellist() {
  return PhpRequest({
    url: '/user/querylabellist',
    method: 'post'
  })
}
// 给单个客户加标签
export function userupdatelabel(data) {
  return PhpRequest({
    url: '/user/userupdatelabel',
    method: 'post',
    data
  })
}
// 批量客户加标签
export function giveuserlabel(data) {
  return PhpRequest({
    url: '/user/giveuserlabel',
    method: 'post',
    data
  })
}
// 获取获取标签列表
export function getlabellist (data) {
  return PhpRequest({
    url: '/user/labellist',
    method: 'post',
    data: {
      site_id: store.getters.site_id,
      ...data
    }
  })
}
// 新增或修改客户标签
export function labelsave (data) {
  return PhpRequest({
    url: '/user/labelsave',
    method: 'post',
    data
  })
}
// 删除客户标签，可批量
export function labeldel (id) {
  return PhpRequest({
    url: '/user/labeldel',
    method: 'post',
    data: { id }
  })
}
// 客户标签详情
export function getLabeldetails (data) {
  return PhpRequest({
    url: '/user/labeldetails',
    method: 'post',
    data
  })
}
// 获取客户分群列表
export function getGroupinglist (data) {
  return JavaRequest({
    url: '/customer/getGrouping',
    method: 'post',
    data
  })
}
// 获取客户分群中的条件
export function getSelectOption (type) {
  return PhpRequest({
    url: '/user/query_user_group_set',
    method: 'post',
    data: { type }
  })
}
// 获取客群详情
export function getdefaultGroup (id) {
  return PhpRequest({
    url: '/user/getdefaultGroup',
    method: 'post',
    data: { id }
  })
}
// 新增客户群体
export function addGrouping (data) {
  return JavaRequest({
    url: '/customer/addGrouping',
    method: 'post',
    data
  })
}
// 编辑客户群体
export function updateGrouping (data) {
  return PhpRequest({
    url: '/user/updateGrouping',
    method: 'post',
    data
  })
}
// 删除客户群体
export function delGrouping (id) {
  return PhpRequest({
    url: '/user/delGrouping',
    method: 'post',
    data: {id}
  })
}
// 刷新客户群体
export function RefreshGrouping (id) {
  return PhpRequest({
    url: '/user/RefreshGrouping',
    method: 'post',
    data: {id}
  })
}
// 固定客户群体-用户列表
export function defaultGrouping (data) {
  return PhpRequest({
    url: '/user/defaultGrouping',
    method: 'post',
    data
  })
}

// 客户导入列表
export function getImportlist (data) {
  return JavaRequest({
    url: '/customer/query_client_excel',
    method: 'post',
    data
  })
}

// 加油卡下拉
export function querycardlist () {
  return PhpRequest({
    url: '/user/querycardlist',
    method: 'post',
  })
}
// 动态等级简表
export function simpleLevel () {
  return JavaRequest({
    url: '/customer/query_concise_spalevel',
    method: 'post',
  })
}
// 客户导入
export function ImportCustomer (data) {
  return JavaRequest({
    url: '/report/Import',
    method: 'post',
    data
  })
}
// 客户导入-详情
export function ImportDetail (data) {
  return PhpRequest({
    url: '/user/downloadDefault',
    method: 'post',
    data
  })
}

// 新增会员基础设置或修改
export function postBasicsset (data) {
  return PhpRequest({
    url: '/user/basicsset',
    method: 'post',
    data
  })
}
// 删除会员基础设置
export function delBasicsset (id) {
  return PhpRequest({
    url: '/user/basicsdel',
    method: 'post',
    data:{id}
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
// 新增固定等级
export function addFixedLevel (data) {
  return JavaRequest({
    url: '/customer/addFixedLevel',
    method: 'post',
    data
  })
}
// 修改固定等级
export function editFixedLevel (data) {
  return JavaRequest({
    url: '/customer/updateFixedLevel',
    method: 'post',
    data
  })
}
// 删除固定等级
export function delFixedLevel (id) {
  return JavaRequest({
    url: '/customer/delFixedLevel',
    method: 'post',
    data: {id}
  })
}
// 固定等级-详情
export function getFixedLevelDetail (id) {
  return JavaRequest({
    url: '/customer/query_fixedLevel_list',
    method: 'post',
    data: {id}
  })
}
// 查询固定等级-认证列表
export function queryCertification (data) {
  return JavaRequest({
    url: '/customer/queryCertification',
    method: 'post',
    data
  })
}
// 查询固定等级-用户列表
export function queryUserList (data) {
  return JavaRequest({
    url: '/customer/queryUserList',
    method: 'post',
    data
  })
}
// 下载固定等级二维码
export function generateCode (id) {
  return PhpRequest({
    url: '/app/generateCode',
    method: 'post',
    data:{ id },
    timeout: 0,
    // responseType: "blob"
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
// 新增动态等级
export function addMemberSpalevel (total_data) {
  return JavaRequest({
    url: '/customer/addMemberSpalevel',
    method: 'post',
    data: {total_data}
  })
}
// 修改动态等级
export function editMemberSpalevel (total_data) {
  return JavaRequest({
    url: '/customer/update_MemberSpalevel',
    method: 'post',
    data:{total_data}
  })
}
// 删除动态等级
export function delMemberSpalevel (data) {
  return JavaRequest({
    url: '/customer/delMemberSpalevel',
    method: 'post',
    data
  })
}
// 停用动态等级
export function stopMemberSpalevel () {
  return JavaRequest({
    url: '/customer/updateEffect',
    method: 'post',
  })
}
// 动态等级-使用推荐
export function updateMemberSpalevel (star_time) {
  return JavaRequest({
    url: '/customer/updateMemberSpalevel',
    method: 'post',
    data: {
      group_id: store.getters.group_id,
      star_time
    }
  })
}
// 获取积分设置
export function getIntegrallist () {
  let data = {}
  if (store.getters.site_id===(-1)) {
    data.group_id = store.getters.group_id
  }else{
    data.site_id = store.getters.site_id
  }
  return PhpRequest({
    url: '/user/integrallist',
    method: 'post',
    data
  })
}
// 享受优惠不可获积分列表
export function getCannotintegral () {
  return PhpRequest({
    url: '/user/cannotintegral',
    method: 'post'
  })
}
// 提交积分设置
export function postIntegralset (data) {
  return PhpRequest({
    url: '/user/integralset',
    method: 'post',
    data
  })
}
// 新增、修改积分规则
export function addIntegralruleset (data) {
  return PhpRequest({
    url: '/user/integralruleset',
    method: 'post',
    data
  })
}
// 删除积分规则
export function delIntegralruleset (id) {
  return PhpRequest({
    url: '/user/integralruledel',
    method: 'post',
    data: {id}
  })
}
// 结束积分规则
export function stopIntegralruleset (id) {
  return PhpRequest({
    url: '/user/integralruleover',
    method: 'post',
    data: {id}
  })
}
// 积分规则-详情
export function getIntegrallists (id) {
  return PhpRequest({
    url: '/user/integrallists',
    method: 'post',
    data:{id}
  })
}
// 查询积分规则是否冲突
export function ruleConflict (data) {
  return PhpRequest({
    url: '/user/ruleConflict',
    method: 'post',
    data
  })
}
// 积分规则列表
export function getIntegralrulelist (data) {
  if (store.getters.site_id===(-1)) {
    data.group_id = store.getters.group_id
  }else{
    data.site_id = store.getters.site_id
  }
  return PhpRequest({
    url: '/user/integralrulelist',
    method: 'post',
    data
  })
}
// 积分记录头部卡片
export function getIntegralStatistics () {
  return PhpRequest({
    url: '/user/integralStatistics',
    method: 'post'
  })
}
// 积分记录列表
export function getIntegralrecordlist (data) {
  return PhpRequest({
    url: '/user/integralrecordlist',
    method: 'post',
    data
  })
}
// 根据手机号或者编号查询
export function sreachUser (data) {
  return PhpRequest({
    url: '/user/sreachUsers',
    method: 'post',
    data
  })
}
// 查询单用户的积分记录
export function getuserintegrallist (data) {
  return PhpRequest({
    url: '/user/getuserintegrallist',
    method: 'post',
    data
  })
}
// 手动添加积分，减少积分
export function addIntegral (data) {
  return PhpRequest({
    url: '/user/addIntegral',
    method: 'post',
    data
  })
}
// 获取加油站列表
export function getSitelist (data) {
  return PhpRequest({
    url: '/work/sitelist',
    method: 'post',
    data
  })
}
// 获取加油卡列表
export function getGasfillingcardlist (data) {
  return PhpRequest({
    url: '/user/gasfillingcardlist',
    method: 'post',
    data
  })
}
// 新增修改加油卡
export function gasfillingcardsave (data) {
  return PhpRequest({
    url: '/user/gasfillingcardsave',
    method: 'post',
    data
  })
}
// 删除加油卡
export function deleteCard (id) {
  return PhpRequest({
    url: '/user/carddel',
    method: 'post',
    data: { id }
  })
}
// 启用、禁用加油卡
export function changeCardStatus (data) {
  return PhpRequest({
    url: '/user/cardopensave',
    method: 'post',
    data
  })
}
// 获取个人卡列表
export function oneselfcardlist (data) {
  return PhpRequest({
    url: '/user/oneselfcardlist',
    method: 'post',
    data
  })
}
// 个人卡冻结
export function freeze (id) {
  return PhpRequest({
    url: '/user/freeze',
    method: 'post',
    data: {
      id,
      card_type: 0,//0是冻结 1是解冻
    }
  })
}