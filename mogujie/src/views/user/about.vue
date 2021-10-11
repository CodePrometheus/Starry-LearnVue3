<template>
  <div>
    <div v-for='v in list'>
      <span>{{ v.name }}</span>
      <span>{{ v.text }}</span>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { getUser } from '../../api/user'

export default {
  setup () {
    const list = [
      {
        path: '/mall/home',
        text: '首页'
      }, {
        path: '/mall/store',
        text: '商城'
      }, {
        path: '/live/home',
        text: '直播'
      }, {
        path: '/user/about',
        text: '我',
        active: true
      }
    ]

    return {
      list
    }
  }
}
</script>

<style scoped>

</style>
