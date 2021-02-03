import storage from 'store'
import { login, getInfo, logout, _login } from '@/api/login'
import { ACCESS_TOKEN, SITE_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    site_id: storage.get(SITE_ID),// 站点id
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
          // console.log(res.data.user_name)
          // return
          if (res.code==200) {

            storage.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', res.data.token)

            storage.set(SITE_ID, res.data.site_id, 7 * 24 * 60 * 60 * 1000)
            commit('SET_SITE_ID', res.data.site_id)
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
    }

  }
}

export default user
