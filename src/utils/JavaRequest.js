import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const JavaRequest = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: 'https://oiljava.ldyxx.com',
  baseURL: 'https://java.youkeyun365.com',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 500) {
      notification.error({
        message: '警告',
        description: data.message
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: '警告',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
JavaRequest.interceptors.request.use(config => {
  // console.log(config)
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandler)

// response interceptor
JavaRequest.interceptors.response.use((response) => {
  let res = response.data

  if (res.code==200) {
    return res
  }else if(res.code==400){
    notification.error({
      message: '警告',
      description: res.msg
    })
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  }else{
    notification.error({
      message: '警告',
      description: res.msg
    })
  }
  return res
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, JavaRequest)
  }
}

export default JavaRequest

export {
  installer as VueAxios,
  JavaRequest as axios
}
