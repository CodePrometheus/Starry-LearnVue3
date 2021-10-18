<script lang='ts' setup>
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { createMessage } from '@/hooks/CreateMessage'

const store = useStore()
const router = useRouter()

const emailVal = ref(null)
const passwordVal = ref(null)
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]

const onFormSubmit = async (result: boolean) => {
  if (result) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    store.dispatch('loginAndFetch', payload)
      .then(data => {
        createMessage('登录成功 2秒后跳转首页', 'success')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }).catch(e => {
      e.log(e)
    })
  }
}
</script>

<template>
  <div class='login-page mx-auto p-3 w-330'>
    <h5 class='my-4 text-center'>登录到者也</h5>
    <ValidateForm @form-submit='onFormSubmit'>
      <div class='mb-3'>
        <label class='form-label'>邮箱地址</label>
        <ValidateInput
          :rules='emailRules'
          v-model='emailVal'
          placeholder='请输入邮箱地址'
          type='text'
          ref='inputRef'
        />
      </div>
      <div class='mb-3'>
        <label class='form-label'>密码</label>
        <ValidateInput type='password' placeholder='请输入密码'
                       :rules='passwordRules' v-model='passwordVal' />
      </div>
      <template #submit>
        <button type='submit' class='btn btn-primary btn-block btn-large'>登录</button>
      </template>
    </ValidateForm>
  </div>
</template>
