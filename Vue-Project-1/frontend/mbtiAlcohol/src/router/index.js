import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'mbtitest',
          component: () => import('../views/MbtiTest.vue'),
      },
      {
          path: '/mbtiResult',
          name: 'mbtiResult',
          component: () => import('../views/MbtiResult.vue'),
      }

  ],
})

export default router
