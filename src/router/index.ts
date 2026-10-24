import { createRouter, createWebHistory } from 'vue-router';
import ComingSoonView from '../views/ComingSoonView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'coming-soon',
      component: ComingSoonView,
    },
  ],
});

export default router;
