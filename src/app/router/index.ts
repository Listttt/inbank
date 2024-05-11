import {createRouter, createWebHistory} from 'vue-router'
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
          component: () => import('@/pages/home/ui/HomePage.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: ROUTE_NAMES.NOT_FOUND,
          component: () => import('@/pages/not-found/ui/NotFoundPage.vue')
        }
      ]
    },
  ]
})

export default router
