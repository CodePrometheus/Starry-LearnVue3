import { createStore } from 'vuex'
import { arrToObj, asyncAndCommit, getAndCommit, objToArr } from '@/utils/helper'
import { page } from '@/api'
import { getColumns } from '@/api/column'
import { GlobalDataProps, GlobalErrorProps } from '@/store/props'
import { getCurrentUser } from '@/api/auth'

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
    }
  },
  mutations: {
    fetchColumns(state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: +currentPage
      }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
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
    }
  }
})

export default store
