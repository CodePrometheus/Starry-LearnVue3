<script lang='ts'>
import { computed, defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}

export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea' // 想要渲染的type
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        // 判断验证是否全部通过
        const allPassed: boolean = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            // 第一条不满足直接返回false
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<template>
  <div class='validate-input-container pb-3'>
    <input
      v-if="tag !== 'textarea'"
      class='form-control'
      :class="{ 'is-invalid': inputRef.error }"
      v-model='inputRef.val'
      v-bind='$attrs'
    />
    <textarea
      v-else
      class='form-control'
      :class="{ 'is-invalid': inputRef.error }"
      @blur='validateInput'
      v-model='inputRef.val'
      v-bind='$attrs'
    >
    </textarea>
    <span v-if='inputRef.error' class='invalid-feedback'>{{ inputRef.message }}</span>
  </div>
</template>
