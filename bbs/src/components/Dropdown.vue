<script lang='ts' setup>
import { ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)
const dropdownRef = ref<null | HTMLElement>(null)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
const isClickOutside = useClickOutside(dropdownRef)
// 监听isClickOutside的变化，才能渲染视图
watch(isClickOutside, () => {
  // 如果点击的是外面，并且isOpen是打开的，置为false
  if (isClickOutside.value && isOpen.value) {
    isOpen.value = false
  }
})
</script>

<template>
  <div class='dropdown' ref='dropdownRef'>
    <!-- prevent 阻止默认行为 -->
    <a href='#' class='btn btn-outline-light my-2 dropdown-toggle'
       @click.prevent='toggleOpen'>{{ title }} </a>
    <ul class='dropdown-menu' :style="{ display: 'block' }" v-if='isOpen'>
      <slot />
    </ul>
  </div>
</template>

<style scoped>

</style>
