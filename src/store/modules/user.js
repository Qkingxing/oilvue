import storage from 'store'
import { 
  login, 
  getInfo, 
  logout, 
  _login } from '@/api/login'

import { getUserInfo } from '@/api/oa'

import { ACCESS_TOKEN, SITE_ID, GROUP_ID, USER_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { getSitelist } from '@/api/crm'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    site_id: storage.get(SITE_ID),// 站点id
    group_id: storage.get(GROUP_ID),// 集团id
    userId: storage.get(USER_ID),// 账号id
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_SITE_ID: (state, site_id) => {
      state.site_id = site_id
    },
    SET_GROUP_ID: (state, group_id) => {
      state.group_id = group_id
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // console.log(userInfo)
        // return
        _login({
          account: userInfo.username,
          password: userInfo.password
        }).then(res => {
          // console.log(res.data)
          // return
          if (res.code==200) {

            storage.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', res.data.token)

            storage.set(SITE_ID, res.data.site_id, 7 * 24 * 60 * 60 * 1000)
            commit('SET_SITE_ID', res.data.site_id)

            storage.set(GROUP_ID, res.data.group_id, 7 * 24 * 60 * 60 * 1000)
            commit('SET_GROUP_ID', res.data.group_id)

            storage.set(USER_ID, res.data.userId, 7 * 24 * 60 * 60 * 1000)
            commit('SET_USER_ID', res.data.userId)

            commit('SET_NAME', { name: res.data.user_name, welcome: welcome() })
            resolve()
          }else{
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
        // login(userInfo).then(res => {
        //   const result = res.result
        //   storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        //   commit('SET_TOKEN', result.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          getUserInfo().then((res)=>{
            console.log(res)
          })

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove(SITE_ID)
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
        })
      })
    },

    // 获取油站列表
    getSitelist ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getSitelist(params).then((res) => {
          // commit('SET_TOKEN', '')
          // console.log(res)
          if (res.code===200) {
            resolve(res)
          }else{
            reject(new Error('getSitelist: roles must be a non-null array !'))
          }
        }).catch(error => {
          reject(error)
        }).finally(() => {
        })
      })
    },


  }
}

export default user
