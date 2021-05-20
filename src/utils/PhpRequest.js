import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const PhpRequest = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: 'https://oilphp.ldyxx.com',
  baseURL: 'https://php.youkeyun365.com',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // console.log(data)
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 500) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
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
PhpRequest.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandler)

// response interceptor
PhpRequest.interceptors.response.use((response) => {
  let res = response.data

  if (res.code==200) {
    return res
  }else if(res.code==400){
    notification.error({
      message: 'Forbidden',
      description: res.msg
    })
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  }else{
    notification.error({
      message: 'Forbidden',
      description: res.msg
    })

  }
  return res
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, PhpRequest)
  }
}

export default PhpRequest

export {
  installer as VueAxios,
  PhpRequest as axios
}
