import { createStore } from 'vuex'
import { arrToObj, asyncAndCommit, getAndCommit, objToArr, postAndCommit } from '@/utils/helper'
import { IGetCid, IGetPosts, ILogin, page } from '@/api'
import { getColumn, getColumnPosts, getColumns } from '@/api/column'
import { GlobalDataProps, GlobalErrorProps } from '@/store/props'
import { getCurrentUser, login } from '@/api/auth'
import { deletePost, getPost, post, updatePost } from '@/api/post'

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: {
      isLogin: false
    }
  },
  getters: {
    getColumns: state => {
      return objToArr(state.columns.data)
    },
    getColumnById: state => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: state => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: state => (id: any) => {
      return state.posts.data[id]
    }
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser(state, data) {
      state.user = { isLogin: true, ...data }
    },
    login(state, data) {
      state.token = data.token
      localStorage.setItem('token', data.token)
    },
    fetchColumns(state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: +currentPage
      }
    },
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumn(state, data) {
      state.columns.data[data._id] = data
    },
    fetchPosts(state, { data, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost(state, rawData) {
      state.posts.data[rawData._id] = rawData
    },
    updatePost(state, data) {
      state.posts.data[data._id] = data
    },
    deletePost(state, data) {
      delete state.posts.data[data._id]
    }
  },
  actions: {
    fetchColumns({ state, commit }, params: page) {
      if (state.columns.currentPage < params.currentPage) {
        return asyncAndCommit(getColumns, params, 'fetchColumns', commit)
      }
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit(getCurrentUser, null, 'fetchCurrentUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchColumn({ state, commit }, params: IGetCid) {
      if (state.columns.data[params.cid]) return
      return asyncAndCommit(getColumn, params, 'fetchColumn', commit)
    },
    fetchPosts({ state, commit }, params: IGetPosts) {
      if (state.posts.loadedColumns.includes(params.cid)) return
      return asyncAndCommit(getColumnPosts, params, 'fetchPosts',
        commit, params.cid)
    },
    createPost({ commit }, data) {
      return postAndCommit(post, data, 'createPost', commit)
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(updatePost, { id, payload }, 'updatePost', commit)
    },
    deletePost({ commit }, cid) {
      return asyncAndCommit(deletePost, { cid }, 'deletePost', commit)
    },
    // 获取文章详情
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      // 判断有没有id 或者 内容详情，是否需要请求获取详情
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(getPost, { cid: id }, 'fetchPost', commit)
      } else {
        let res = { data: currentPost }
        return [null, res]
      }
    },
    login({ commit }, data: ILogin) {
      return postAndCommit(login, data, 'login', commit)
    }
  }
})

export default store
