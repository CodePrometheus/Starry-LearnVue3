import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true
})

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description 设置为true，则会在请求过程中显示loading动画，直到请求结束才消失
     */
    loading?: boolean
  }
}

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (store.state.token) {
      config.headers['Authorization'] = `Bearer ${ store.state.token }`
    }
    if (config.loading) {
      store.commit('setLoading', true)
    }
    return config
  },
  (error: any) => {
    Promise.reject(error).then(r => {
      return r
    })
  }
)

service.interceptors.response.use(
  async (response: AxiosResponse) => {
    store.commit('setError', { status: false, message: '' })
    store.commit('setLoading', false)
    const res: any = response.data
    if (res.code !== 0) {
      if (res.code === 401 || res.code === 403 || res.code === 408) {
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    } else {
      return response.data
    }
  },
  (e: any) => {
    store.commit('setLoading', false)
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    if (e && e.response) {
      switch (e.response.status) {
        case 400:
          e.message = '请求错误(400)'
          break
        case 401:
          e.message = '未授权,请登录(401)'
          break
        case 403:
          e.message = '拒绝访问(403)'
          break
        case 404:
          e.message = `请求地址出错: ${ e.response.config.url }`
          break
        case 405:
          e.message = '请求方法未允许(405)'
          break
        case 408:
          e.message = '请求超时(408)'
          break
        case 500:
          e.message = '服务器内部错误(500)'
          break
        case 501:
          e.message = '服务未实现(501)'
          break
        case 502:
          e.message = '网络错误(502)'
          break
        case 503:
          e.message = '服务不可用(503)'
          break
        case 504:
          e.message = '网络超时(504)'
          break
        case 505:
          e.message = 'HTTP版本不受支持(505)'
          break
        default:
          e.message = `连接错误: ${ e.message }`
      }
    } else {
      e.message = '连接到服务器失败，请联系管理员'
    }
    return Promise.reject(error)
  }
)

export const awaitWarp = (promise: Promise<any>) => {
  return promise.then(res => [null, res])
    .catch(err => [err, null])
}

export default service
