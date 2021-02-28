import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const allowList = ['login'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (store.getters.roles.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            const roles = res.result && res.result.role
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// import router from './router'
// import store from './store'
// import notification from 'ant-design-vue/es/notification'
// import NProgress from 'nprogress' // progress bar
// import '@/components/NProgress/nprogress.less' // progress bar custom style
// import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import storage from 'store'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['login'] // 跳转白名单
// const loginRoutePath = '/system/login'
// // const routePath = '/'
// const defaultRoutePath = '/system/index'

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
//   // 因为我们这个项目是好几个子系统，所以用户的token信息存在来cookie里面					  	//getToken()也就是这个方法里面
//   if (storage.get(ACCESS_TOKEN) !== undefined) {
//     if (to.path === '/') {
//       next({ path: defaultRoutePath })
//       NProgress.done()
//     } else {
//     // 这个判断是防止用户疯狂刷新页面 ，所以判断一下store有没有用户信息，
//     // 如果没有用户信息则调用 src/user.js中的GetInfo方法，在上方注解中
//       if (store.getters.roles.length === 0) {
//         // 设置登陆用户信息 比如头像姓名等
//         store.dispatch('GetInfo').then(res => {
//           // 动态生成当前用户等路由表
//           store.dispatch('GenerateRoutes').then(res => {
//             // 将此路由挂载
//             router.addRoutes(store.getters.addRouters)
//             // 请求带有 redirect 重定向时，登录自动重定向到该地址
//             const redirect = decodeURIComponent(from.query.redirect || to.path)
//             if (to.path === redirect) {
//               next({ ...to, replace: true })
//             } else {
//               // 跳转目的路由
//               next({ path: defaultRoutePath })
//             }
//           })
//         }).catch(() => {
//           notification.error({
//             message: '错误',
//             description: '请求用户信息失败，请重试'
//           })
//           // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
//           store.dispatch('Logout').then(() => {
//             next({ path: loginRoutePath, query: { redirect: to.fullPath } })
//           })
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.includes(to.name)) {
//       next()
//     } else {
//     console.log('重定向登录')
//       next({ path: loginRoutePath, query: { redirect: to.fullPath } })
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
