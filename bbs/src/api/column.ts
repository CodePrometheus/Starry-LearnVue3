import request, { awaitWarp } from '@/utils/request'
import { page } from '@/api/index'


/**
 * 获取专栏列表
 * @param params
 */
export const getColumns = (params: page) => {
  return awaitWarp(
    request({
      url: '/columns',
      method: 'get',
      params,
      loading: true
    })
  )
}
