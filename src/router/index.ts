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
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/pages/SettingsPage.vue'),
    },
    {
      name: 'templates',
      path: '/templates',
      component: () => import('@/pages/TemplatesPage.vue'),
    },
  ],
});

export default router;
