import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/problem',
      name: 'problem',
      component: () => import('../views/ProblemView.vue'),
    },
      {
          path: '/qualityTips',
          name: 'qualityTips',
          component: () => import('../views/QualityTipsView.vue'),
      },
      {
          path: '/ampm',
          name: 'ampm',
          component: () => import('../views/AmPmRoutineView.vue'),
      },
      {
          path: '/season',
          name: 'season',
          component: () => import('../views/SeasonRoutineView.vue'),
      },
      {
          path: '/guide',
          name: 'guide',
          component: () => import('../views/ProductGuideView.vue'),
      },
      {
          path: '/content',
          name: 'content',
          component: () => import('../views/ContentView.vue'),
      },
  ],
})

export default router
