<script setup lang="ts">
import { useProducts } from "../store/products"
import { useCartStore } from '../store/carts'

const productsStore = useProducts()
productsStore.listAll()

const cartStore = useCartStore()
</script>

<template>
  <ul>
    <li v-for="v in productsStore.list">
      {{ v.title }} - {{ v.price }}
      <br />
      <button
        :disabled="!v.inventory"
        @click="cartStore.addToCart(v)"
      >
        Add to List
      </button>
    </li>
  </ul>
</template>