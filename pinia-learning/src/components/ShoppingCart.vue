<script setup lang="ts">
import { useCartStore } from "../store/carts"

const cartStore = useCartStore()
</script>

<template>
  <div>
    <h2 /> List
    <p>
      <i>Add Something</i>
    </p>
    <ul>
      <li
        v-for="v in cartStore.cartProducts"
      >
        {{ v.title }} - {{ v.price }} x {{ v.number }}
      </li>
    </ul>
    <p>Total: {{ cartStore.totalPrice }}</p>
    <p>
      <button @click="cartStore.checkOut">结算</button>
    </p>
    <p v-show="cartStore.checkOutStatus">结算: {{ cartStore.checkOutStatus }}</p>
  </div>
</template>