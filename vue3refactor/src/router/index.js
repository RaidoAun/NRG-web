import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/parkimine',
    name: 'Parkimine',
    component: () => import('../views/Parking.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
