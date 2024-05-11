import {createRouter, createWebHistory } from 'vue-router'
import {ROUTE_NAMES} from "@/shared/config/";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.MAIN,
      component: () => import('@/app/layout/Layout.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAMES.HOME,
          component: () => import('@/pages/HomePage.vue')
        }

      ]
    },
  ]
})

export default router
