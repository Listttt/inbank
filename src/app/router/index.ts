// import {createRouter, createWebHistory } from 'vue-router'
// import {ROUTE_NAMES} from "@/shared/config/";
//
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: ROUTE_NAMES.HOME,
//       component: () => import('@/pages/HomePage.vue')
//     }
//   ]
// })
//
// export default router

import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";
import {ROUTE_NAMES} from "@/shared/config";

const routes = [
  {
    path: "/",
    name: ROUTE_NAMES.HOME,
    component: () => import("@/pages/HomePage.vue"),
  },
];

export const createRouter = () =>
    _createRouter({
      history: import.meta.env.SSR
          ? createMemoryHistory("/")
          : createWebHistory("/"),
      routes,
    });