<script lang='ts' setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Loading from '@/components/loading.vue'
import { computed, watch } from 'vue'
import { GlobalDataProps } from '@/store/props'
import { useStore } from 'vuex'
import { createMessage } from '@/hooks/CreateMessage'

const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
const isLoading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

watch(
  () => error.value.status,
  () => {
    const { status, message } = error.value
    if (status && message) {
      createMessage(message, 'error')
    }
  }
)

</script>

<template>
  <div class='d-flex flex-column h-100'>
    <Header :user='currentUser' />
    <Loading text='拼命加载中' background='rgba(0,0,0,0.8)'
             v-if='isLoading' />
    <router-view />
    <Footer />
  </div>
</template>
