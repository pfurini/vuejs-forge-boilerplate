import { createRouter, createWebHistory } from 'vue-router';

// this works with the vite plugin to support file based routing

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/IndexPage.vue'),
    },
    {
      name: 'boards',
      path: '/boards',
      component: () => import('@/pages/BoardsPage.vue'),
    },
  ],
});

export default router;
