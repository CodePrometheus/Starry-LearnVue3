<script lang='ts' setup>
import useDomCreate from '@/hooks/UseDomCreate'

const props = defineProps({
  text: {
    type: String
  },
  background: {
    type: String
  }
})
useDomCreate('back')
</script>

<template>
  <teleport to='#back'>
    <div
      class='d-flex justify-content-center align-items-center h-100 w-100 loading-container'
      :style="{ backgroundColor: background || '' }"
    >
      <div class='loading-content'>
        <div class='spinner-border text-primary' role='status'>
          <span class='visually-hidden'>{{ text || 'loading' }}</span>
        </div>
        <p v-if='text' class='text-primary small'>{{ text || 'loading...' }}</p>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}

.loading-container {
  text-align: center;
}
</style>
