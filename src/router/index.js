import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: ()=>import(/* webpackChunkName: "sign" */ '../views/sign.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: ()=>import(/* webpackChunkName: "user" */ '../views/user.vue')
  },
  {
    path: '/singlenews',
    name: 'singlenews',
    component: ()=>import(/* webpackChunkName: "singlenews" */ '../views/singlenews.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import(/* webpackChunkName: "search" */ '../views/search.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
