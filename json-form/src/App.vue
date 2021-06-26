<template>
  <img alt='Vue logo' src='./assets/logo.png' />
  <HelloWorld msg='Welcome to Your Vue.js + TypeScript App' />
  <p>{{ name }}: {{ computedName }}</p>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

interface Config {
  name: string
}

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup(props, { slots, attrs, emit }) {
    // const state = reactive({
    //   name: 'star'
    // })
    const name = ref('star')
    setInterval(() => {
      // state.name += '1'
      name.value += '1'
    }, 1000)

    const computedName = computed(() => {
      return (name.value + '2')
    })

    watchEffect(() => {
      console.log(name.value)
    })

    return {
      name, computedName
    }
  }

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
