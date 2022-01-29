import { defineStore } from 'pinia'
import { buyProducts, IProduct } from '../api/show'
import { useProducts } from './products'

// 除掉inventory
type CartProduct = {
  number: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('carts', {
  state: () => {
    return {
      cartProducts: [] as IProduct[],
      checkOutStatus: null as null | string
    }
  },
  getters: {
    totalPrice(state) {
      return state.cartProducts.reduce((total, v) => {
        return total + v.price * v.number
      }, 0)
    }
  },
  actions: {
    addToCart(product: IProduct) {
      if (product.inventory < 1) {
        return
      }
      const num = this.cartProducts.find(v => v.id === product.id)
      if (num) {
        num.number++
      } else {
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          number: 1
        })
      }
      const productsStore = useProducts()
      productsStore.deProduct(product.id)
    },
    async checkOut() {
      const res = await buyProducts()
      this.checkOutStatus = res ? "成功" : "失败"
      if (res) {
        this.cartProducts = []
      }
    }
  }
})