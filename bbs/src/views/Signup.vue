<script lang='ts' setup>
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'
import { createMessage } from '@/hooks/CreateMessage'

const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]

const nameRules: RulesProp = [
  { type: 'required', message: '昵称不能为空' }
]

const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]

const repeatPasswordRules: RulesProp = [
  { type: 'required', message: '重复密码不能为空' },
  {
    type: 'custom',
    validator: () => {
      return formData.password === formData.repeatPassword
    },
    message: '密码不相同'
  }
]

const formData = reactive({
  email: '',
  nickName: '',
  password: '',
  repeatPassword: ''
})

const router = useRouter()
const onFormSubmit = async (res: boolean) => {
  if (res) {
    const payload = {
      email: formData.email,
      password: formData.password,
      name: formData.nickName
    }
    let [err, data] = await register(payload)
    if (err) {
      console.log(err)
      return
    }
    createMessage('注册成功 正在跳转登录页面', 'success')
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
}
</script>

<template>
  <div class='signup-page mx-auto p-3 w-330'>
    <h5 class='my-4 text-center'>注册者也账户</h5>
    <ValidateForm @form-submit='onFormSubmit'>
      <div class='mb-3'>
        <label class='form-label'>邮箱地址</label>
        <ValidateInput :rules='emailRules' v-model='formData.email' placeholder='请输入邮箱地址' type='text' />
      </div>
      <div class='mb-3'>
        <label class='form-label'>昵称</label>
        <ValidateInput :rules='nameRules' v-model='formData.nickName' placeholder='请输入昵称' type='text' />
      </div>
      <div class='mb-3'>
        <label class='form-label'>密码</label>
        <ValidateInput
          type='password'
          placeholder='请输入密码'
          :rules='passwordRules'
          v-model='formData.password'
        />
      </div>
      <div class='mb-3'>
        <label class='form-label'>重复密码</label>
        <ValidateInput
          type='password'
          placeholder='请再次密码'
          :rules='repeatPasswordRules'
          v-model='formData.repeatPassword'
        />
      </div>
      <template #submit>
        <button type='submit' class='btn btn-primary btn-block btn-large'>注册新用户</button>
      </template>
    </ValidateForm>
  </div>
</template>
