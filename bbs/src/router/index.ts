import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/create',
    component: () => import('@/views/Create.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('@/views/PostDetail.vue')
  }
]

const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
