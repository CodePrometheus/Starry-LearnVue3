<script lang='ts' setup>
import Modal from '@/components/Modal.vue'
import UserProfile from '@/components/UserProfile.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps, PostProps, UserProps } from '@/store/props'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { createMessage } from '@/hooks/CreateMessage'
import MarkdownIt from 'markdown-it'

const store = useStore<GlobalDataProps>()
const route = useRoute()
const router = useRouter()

const modalIsVisible = ref(false)
const currentId = route.params.id
const md = new MarkdownIt()

onMounted(() => {
  store.dispatch('fetchPost', currentId)
})

const currentPost = computed<PostProps>(() =>
  store.getters.getCurrentPost(currentId)
)

const currentHTML = computed(() => {
  const { content, isHTML } = currentPost.value
  if (currentPost.value && content) {
    return isHTML ? content : md.render(content)
  }
})

// 是否有权限编辑
const showEdit = computed(() => {
  const { isLogin, _id } = store.state.user
  if (currentPost.value && currentPost.value.author && isLogin) {
    const author = currentPost.value.author as UserProps
    return author._id === _id
  } else {
    return false
  }
})

const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return (image as ImageProps).url +
      '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})

const hideOrDelete = async () => {
  modalIsVisible.value = false
  let [err, rawData] = await store.dispatch('deletePost', currentId)
  if (err) return console.log(err)
  createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
  setTimeout(() => {
    router.replace({
      name: 'column',
      params: {
        id: rawData.data.column
      }
    })
  }, 2000)
}
</script>

<template>
  <div>
    <Modal
      title='删除文章'
      :visible='modalIsVisible'
      @modal-on-close='modalIsVisible = false'
      @modal-on-confirm='hideOrDelete'
    >
      <p>确定要删除这篇文章吗？</p>
    </Modal>
    <article class='w-75 mx-auto mb-5 pb-3' v-if='currentPost'>
      <img :src='currentImageUrl' :alt='currentPost.title'
           class='rounded-lg img-fluid my-4' v-if='currentImageUrl' />
      <h2 class='mb-4'>{{ currentPost.title }}</h2>
      <div class='border-top border-bottom py-3 mb-5
      align-items-center row g-0'>
        <div class='col'>
          <UserProfile
            :user='currentPost.author'
            v-if="typeof currentPost.author ==='object'"
          />
        </div>
        <span
          class='text-muted col text-right font-italic'>
          发表于：{{ currentPost.createdAt }}
        </span>
      </div>
      <div v-html='currentHTML' />
      <div v-if='showEdit' class='btn-toolbar' role='toolbar'
           aria-label='Toolbar with button groups'>
        <router-link
          type='button'
          class='btn btn-success btn-group me-4 role="group" aria-label="First group"'
          :to="{ path: '/create',
                 query: { id: currentPost._id } }"
        >
          编辑
        </router-link>
        <button type='button' class='btn btn-danger btn-group'
                @click.prevent='modalIsVisible = true'
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>
