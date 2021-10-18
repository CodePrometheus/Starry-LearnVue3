<script lang='ts' setup>
import { UserProps } from '@/store/props'
import { PropType } from 'vue'

const props = defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})
</script>

<template>
  <div>
    <div class='d-flex align-items-center'>
      <img :src='user.avatar.url'
           :alt='user.nickName'
           class='rounded-circle img-thumbnail w-25 h-25'
      />
      <div class='detail ml-2'>
        <h6 class='d-block mb-0'>{{ user.nickName }}</h6>
        <span class='text-truncate text-muted d-block'>{{ user.description }}</span>
      </div>
    </div>
  </div>
</template>
