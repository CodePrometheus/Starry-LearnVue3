<script lang='ts' setup>
import PostList from '@/components/PostList.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ColumnProps, GlobalDataProps } from '@/store/props'
import { computed, onMounted } from 'vue'

const route = useRoute()
const store = useStore<GlobalDataProps>()
const currentId = route.params.id

onMounted(() => {
  store.dispatch('fetchColumn', { cid: currentId })
  store.dispatch('fetchPosts', {
    cid: currentId,
    currentPage: 1, pageSize: 5
  })
})

const column = computed(() => {
  return store.getters
    .getColumnById(currentId) as ColumnProps | undefined
})

const list = computed(() => store.getters
  .getPostsByCid(currentId))
</script>

<template>
  <div class='column-detail-page w-75 mx-auto'>
    <div class='column-info row mb-4 border-bottom pb-4 align-items-center' v-if='column'>
      <div class='col-3 text-center'>
        <img :src='column.avatar.url' :alt='column.title'
             class='rounded-circle border w-100' />
      </div>
      <div class='col-9'>
        <h4>{{ column.title }}</h4>
        <p class='text-muted'>{{ column.description }}</p>
      </div>
    </div>
    <PostList :list='list' />
  </div>
</template>
