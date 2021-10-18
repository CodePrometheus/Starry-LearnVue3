import request, { awaitWarp } from '@/utils/request'
import { ILogin } from '@/api/index'

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  return awaitWarp(
    request({
      url: '/user/current',
      method: 'get',
      loading: false
    })
  )
}

/**
 * 登录
 * @param data
 */
export const login = (data: ILogin) => {
  return awaitWarp(
    request({
      url: '/user/login',
      method: 'post',
      data,
      loading: true
    })
  )
}

/**
 * 注册
 * @param data
 */

export const register = (data: ILogin) => {
  return awaitWarp(
    request({
      url: '/users',
      method: 'post',
      data,
      loading: true
    })
  )
}
