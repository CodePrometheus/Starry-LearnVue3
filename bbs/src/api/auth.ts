import request, { awaitWarp } from '@/utils/request'

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
