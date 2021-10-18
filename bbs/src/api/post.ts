import request, { awaitWarp } from '@/utils/request'
import { ICreatePost, IGetCid } from './index'

/**
 * 获得单个文章信息
 * @param params
 */
export const getPost = (params: IGetCid) => {
  return awaitWarp(
    request({
      url: `/posts/${ params.cid }`,
      method: 'get',
      loading: false
    })
  )
}

/**
 * 更新单个文章信息
 * @param data
 */
export const updatePost = (data: any) => {
  let { id, payload } = data
  return awaitWarp(
    request({
      url: `/posts/${ id }`,
      method: 'patch',
      data: payload,
      loading: false
    })
  )
}

/**
 * 新建一篇文章
 */
export const post = (data: ICreatePost) => {
  return awaitWarp(
    request({
      url: '/posts',
      method: 'post',
      data,
      loading: false
    })
  )
}

/**
 * 删除单个文章信息
 * @param params
 */
export const deletePost = (params: IGetCid) => {
  return awaitWarp(
    request({
      url: `/posts/${ params.cid }`,
      method: 'delete',
      loading: true
    })
  )
}

/**
 * 上传文件
 * @param url
 * @param data
 */
export const upload = (url: string, data: FormData) => {
  return awaitWarp(
    request({
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      loading: true
    })
  )
}
