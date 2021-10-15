import { Commit } from 'vuex'

/**
 * 对象转数组
 * 添加泛型
 * @param obj
 */
export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

/**
 * 数组转对象
 * @param arr
 */
// 添加泛型T
// <T extends {_id?:string}> 约束泛型，类型推导，保证有一个_id属性
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((pre, current) => {
    if (current._id) {
      pre[current._id] = current
    }
    return pre
  }, {} as { [key: string]: T }) // 类型断言
}

export const getAndCommit = async (fn: Function, params: any, mutationName: string, commit: Commit) => {
  let [err, res] = await fn(params)
  if (err) {
    console.log(err)
    return [err, res]
  }
  commit(mutationName, res && res.data)
  return [err, res]
}

export const postAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit) => {
  try {
    let [err, res] = await fn(data)
    if (err) {
      console.log(err)
      return [err, res]
    }
    commit(mutationName, res && res.data)
    return [err, res]
  } catch (error) {
    console.log(error)
  }
}

export const asyncAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit, extraData?: any) => {
  try {
    let [err, res] = await fn(data)
    if (err) {
      console.log(err)
      return [err, res]
    }
    if (extraData) {
      commit(mutationName, { data: res.data, extraData })
    } else {
      commit(mutationName, res.data)
    }
    return [err, res]
  } catch (error) {
    console.log(error)
  }
}
