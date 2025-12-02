import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Today from '@/views/completed.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/today', component: Today },
  ],
})

export default router
