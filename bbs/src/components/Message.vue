<script lang='ts' setup>
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'

export type MessageType = 'success' | 'error' | 'default'

const props = defineComponent({
  message: String,
  type: {
    type: String as PropType<MessageType>,
    default: 'default'
  }
})

const emits = defineEmits(['close-message'])

useDOMCreate('message')
const isVisible = ref(true)

const classObject = {
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default'
}

const hide = () => {
  isVisible.value = false
  emits('close-message', true)
}
</script>

<template>
  <teleport to='#message'>
    <div
      class='alert message-info fixed-top w-50 mx-auto d-flex
       justify-content-between mt-2'
      :class='classObject'
      v-if='isVisible'
    >
      <span>{{ message }}</span>
      <button type='button'
              class='btn-close'
              aria-label='Close'
              @click.prevent='hide'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  </teleport>
</template>
