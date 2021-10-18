<script lang='ts' setup>
import { PropType, ref, watch } from 'vue'
import { upload } from '@/api/post'

const props = defineProps({
  beforeUpload: {
    type: Function as PropType<(file: File) => boolean>
  },
  uploaded: {
    type: Object
  },
  action: {
    type: String,
    required: true
  }
})

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
const fileStatus = ref<UploadStatus>(
  props.uploaded ? 'success' : 'ready')
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedData = ref(props.uploaded)

const emit = defineEmits(['file-uploaded', 'file-uploaded-error', 'file-uploaded'])

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const files = Array.from(target.files)
  if (props.beforeUpload) {
    const res = props.beforeUpload(files[0])
    if (!res) return
  }
  fileStatus.value = 'loading'

  const formData = new FormData()
  formData.append('file', files[0])


  let [err, res] = await upload(props.action, formData)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  if (err) {
    fileStatus.value = 'error'
    console.log(err)
    emit('file-uploaded-error', err)
    return
  }
  fileStatus.value = 'success'
  uploadedData.value = res
  emit('file-uploaded', res)
  console.log(res)
}

const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

watch(
  () => props.uploaded,
  newValue => {
    if (!newValue) return
    fileStatus.value = 'success'
    uploadedData.value = newValue
  }
)
</script>

<template>
  <div class='file-upload'>
    <div class='file-upload-container'
         @click.prevent='triggerUpload'
         v-bind='$attrs'
    >
      <slot name='loading' v-if="fileStatus === 'loading'">
        <button class='btn btn-primary' disabled>
          正在上传....
        </button>
      </slot>
      <slot name='uploaded'
            :uploadedData='uploadedData'
            v-else-if="fileStatus === 'success'">
        <button class='btn btn-primary'>上传成功</button>
      </slot>
      <slot name='uploadError'
            v-else-if="fileStatus === 'error'">
        <button class='btn btn-primary'>上传失败</button>
      </slot>
      <slot name='default' v-else>
        <button class='btn btn-primary'>点击上传</button>
      </slot>
    </div>
    <input type='file' class='file-input d-none'
           ref='fileInput' @change='handleFileChange' />
  </div>
</template>
