<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'

export const emitter: Emitter = mitt()
type ValidateFunc = () => boolean
export default defineComponent({
  props: {},
  emits: ['form-submit'],
  setup(context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // every和some方法，有true会在提前停止循环
      // 循环执行数组 得到最后的验证结果
      // funcArr.map(func => func()) 返回一个boolean[]
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    // 父组件监听事件
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>

<template>
  <form class='validate-form-container'>
    <slot name='default'></slot>
    <div class='submit-area' @click.prevent='submitForm'>
      <slot name='submit'>
        <button type='submit' class='btn btn-primary'>提交</button>
      </slot>
    </div>
  </form>
</template>
