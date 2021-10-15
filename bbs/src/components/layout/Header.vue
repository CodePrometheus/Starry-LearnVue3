<script lang='ts' setup>
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { PropType } from 'vue'
import { UserProps } from '@/store/props'

const props = defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})
</script>

<template>
  <nav class='navbar navbar-dark bg-primary justify-content-between mb-4 px-4 bg-dark'>
    <router-link to='/' class='navbar-brand px-4'>Starry-BBS</router-link>
    <ul v-if='!user.isLogin' class='list-inline mb-0'>
      <li class='list-inline-item'>
        <router-link to='/login' class='btn btn-outline-light my-2'>登陆</router-link>
      </li>
      <li class='list-inline-item'>
        <router-link to='/signup' class='btn btn-outline-light my-2'>注册</router-link>
      </li>
    </ul>
    <ul v-else class='list-inline mb-0'>
      <li class='list-inline-item'>
        <Dropdown :title='`你好 ${user.nickName}`'>
          <DropdownItem>
            <router-link to='/create' class='dropdown-item'>新建文章</router-link>
          </DropdownItem>
          <DropdownItem>
            <router-link :to='`/column/${user.column}`' class='dropdown-item'>我的专栏</router-link>
          </DropdownItem>
          <DropdownItem :disabled='true'>
            <a href='#' class='dropdown-item'>编辑资料</a>
          </DropdownItem>
          <DropdownItem><a href='#' class='dropdown-item'>退出登录</a></DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>
