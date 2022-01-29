import { defineStore } from 'pinia'
import { getProducts, IProduct } from '../api/show'

export const useProducts = defineStore('products', {
  state: () => {
    return {
      list: [] as IProduct[]
    }
  },
  getters: {},
  actions: {
    async listAll() {
      this.list = await getProducts()
    },
    deProduct(id: number) {
      const res = this.list.find(v => v.id === id)
      if (res) {
        res.inventory--
      }
    }
  }
})