import about from '../views/user/about/about.vue'
import login from '../views/user/login/login.vue'
import home from '../views/mall/home/home.vue'
import store from '../views/mall/store/store.vue'
import category from '../views/mall/category/category.vue'
import goods from '../views/mall/goods/goods.vue'
import goodsDetail from '../views/mall/goods/detail.vue'
import brandVideo from '../views/mall/brand-video/brand-video.vue'
import liveHome from '../views/live/home/home.vue'
import detail from '../views/live/detail/detail.vue'
import fastBuy from '../views/promotion/fast-buy/fast-buy.vue'
import lastCrazy from '../views/promotion/fast-buy/last-crazy.vue'
import myReminder from '../views/promotion/fast-buy/my-reminder.vue'
import jjyz from '../views/promotion/activities/jjyz.vue'
import qdpsfx from '../views/promotion/activities/qdpsfx.vue'
import ydftx from '../views/promotion/activities/ydftx.vue'
import compass from '../views/frame-work/compass.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/mall/home',
    component: home
  },
  {
    path: '/mall/store',
    component: store
  },
  {
    path: '/mall/category',
    component: category
  },
  {
    path: '/mall/goods',
    component: goods
  },
  {
    path: '/mall/goods-detail',
    component: goodsDetail
  },
  {
    path: '/mall/brand-video',
    component: brandVideo
  },
  {
    path: '/user/about',
    component: about
  },
  {
    path: '/user/login',
    component: login
  },
  {
    path: '/live/home',
    component: liveHome
  },
  {
    path: '/live/detail',
    component: detail
  },
  {
    path: '/promotion/fast-buy',
    component: fastBuy
  },
  {
    path: '/promotion/last-crazy',
    component: lastCrazy
  },
  {
    path: '/promotion/my-reminder',
    component: myReminder
  },
  {
    path: '/promotion/ydftx',
    component: ydftx
  },
  {
    path: '/promotion/jjyz',
    component: jjyz
  },
  {
    path: '/promotion/qdpsfx',
    component: qdpsfx
  },
  {
    path: '/frame-work/compass',
    name: 'Compass',
    component: compass
  }
]

const routerHistory = createWebHistory()
const router = createRouter({
  history: createWebHashHistory(routerHistory),
  routes
})

export default router
