<script lang='ts' setup>
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps, PostProps, ResponseType } from '@/store/props'
import { createMessage } from '@/hooks/CreateMessage'
import { beforeUploadCheck } from '@/utils/helper'

// 跳转的路由对象 可以获取对应的name,path,params,query等
const route = useRoute()
const isEditMode = !!route.query.id

// VueRouter的一个对象 全局的对象，包含了所有的路由包含了许多关键的对象和属性
const router = useRouter()

const uploadedData = ref()
const titleVal = ref('')
const contentVal = ref('')
let imageId = ''

const store = useStore<GlobalDataProps>()

const titleRules: RulesProp =
  [{ type: 'required', message: '文章标题不能为空' }]
const contentRules: RulesProp =
  [{ type: 'required', message: '文章详情不能为空' }]

onMounted(async () => {
  if (isEditMode) {
    let [err, data] = await store.dispatch('fetchPost',
      route.query.id
    )
    if (err) return console.log(err)
    const post = data.data
    if (post.image) {
      uploadedData.value = { data: post.image }
    }
    titleVal.value = post.title
    contentVal.value = post.content
  }
})

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    createMessage('上传图片只能是JPG格式', 'error')
  }
  return isJPG
}

const uploadCheck = (file: File) => {
  const { passed, error } = beforeUploadCheck(file,
    { format: ['image/jpeg', 'image/png'], size: 4 })
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式!',
      'error')
  }
  if (error === 'size') {
    createMessage('上传图片大小不能超过 1Mb', 'error')
  }
  console.log(passed)
  return passed
}

const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  createMessage(`上传图片ID${ rawData.data._id }`,
    'success')
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}

const onFormSubmit = async (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      const actionName = isEditMode ?
        'updatePost' : 'createPost'
      const sendData = isEditMode
        ? {
          id: route.query.id,
          payload: newPost
        }
        : newPost
      let [err, res] = await store.dispatch
      (actionName, sendData)
      if (err) {
        createMessage(err, 'error')
        return
      }
      createMessage('发表成功，2秒后跳转到文章',
        'success', 2000)
      setTimeout(() => {
        router.push({ name: 'column', params: { id: column } })
      }, 2000)
    }
  }
}
</script>

<template>
  <div>
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <Uploader
      class='d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4'
      :action="'/upload'"
      :beforeUpload='uploadCheck'
      @file-uploaded='onFileUploaded'
      :uploaded='uploadedData'
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class='d-flex'>
          <div class='spinner-border text-secondary' role='status'>
            <span class='visually-hidden'>Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded='dataProps'>
        <div class='uploaded-area'>
          <img :src='dataProps.uploadedData.data.url' />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>
    <ValidateForm @form-submit='onFormSubmit'>
      <div class='mb-3'>
        <label class='form-label'>文章标题：</label>
        <ValidateInput :rules='titleRules' v-model='titleVal' placeholder='请输入文章标题' type='text' />
      </div>
      <div class='mb-3'>
        <label class='form-label'>文章详情：</label>
        <ValidateInput
          rows='10'
          tag='textarea'
          placeholder='请输入文章详情'
          :rules='contentRules'
          v-model='contentVal'
        />
      </div>
      <template #submit>
        <button class='btn btn-primary btn-large'>{{ isEditMode ? '更新文章' : '发表文章' }}</button>
      </template>
    </ValidateForm>
  </div>
</template>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-area {
  position: relative;
}

.uploaded-area:hover h3 {
  display: block;
}

.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
