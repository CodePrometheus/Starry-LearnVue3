import request, { awaitWarp } from '@/utils/request'
import { IGetCid, IGetPosts, page } from '@/api/index'

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

export const getColumnPosts = (params: IGetPosts) => {
  let { cid, ...newParams } = params
  return awaitWarp(
    request({
      url: `/columns/${ cid }/posts`,
      method: 'get',
      params: newParams,
      loading: true
    })
  )
}

/**
 * 获得一个专栏详情
 * @param {} cid
 */
export const getColumn = ({ cid }: IGetCid) => {
  return awaitWarp(
    request({
      url: `/columns/${ cid }`,
      method: 'get',
      loading: true
    })
  )
}
