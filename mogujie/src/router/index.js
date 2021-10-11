import about from "../views/user/about.vue";
import home from "../views/mall/home/home.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/mall/home",
    component: home,
  },
  {
    path: "/user/about",
    component: about,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
