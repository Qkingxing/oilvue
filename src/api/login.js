import request from '@/utils/request'
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  // UserMenu: '/user/nav',
  UserMenu: '/work/groupmenulist',
  router: '/work/groupmenulist'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
// 登录
export function _login (data) {
  return JavaRequest({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return PhpRequest({
    url: userApi.UserMenu,
    method: 'post'
  })

  // return new Promise((resolve, reject) => {
  //   // loginService.getCurrentUserNav(token).then(res => {
  //   //   console.log('res哈哈哈哈', res)
  //   //   const { result } = res
  //   //   const menuNav = []
  //   //   const childrenNav = []
  //   //   //      后端数据, 根级树数组,  根级 PID
  //   //   listToTree(nav, childrenNav, 0)
  //   //   rootRouter.children = childrenNav
  //   //   menuNav.push(rootRouter)
  //   //   console.log('menuNav', menuNav)
  //   //   const routers = generator(menuNav)
  //   //   routers.push(notFoundRouter)
  //   //   console.log('routers', routers)
  //   //   resolve(routers)
  //   // }).catch(err => {
  //   //   reject(err)
  //   // })
  //   // resolve('hahahahahaahhaha')
  // })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function QueryAuthRoute (params) {
  // https://oilphp.ldyxx.com/work/groupmenuchange
  return PhpRequest({
    url: userApi.router,
    method: 'post',
    data: params
  })
}
