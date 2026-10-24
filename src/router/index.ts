import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
    { path: '/cats/:id', name: 'cat-profile', component: () => import('../views/CatProfileView.vue') },
    { path: '/events/new', name: 'add-event', component: () => import('../views/AddEventView.vue') },
    { path: '/timeline', name: 'timeline', component: () => import('../views/TimelineView.vue') },
    { path: '/events/:id', name: 'event-detail', component: () => import('../views/EventDetailView.vue') },
    { path: '/memories', name: 'memories', component: () => import('../views/MemoriesView.vue') },
    { path: '/memories/:id', name: 'memory-detail', component: () => import('../views/MemoryDetailView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  const title = typeof to.name === 'string' ? to.name.replaceAll('-', ' ') : 'Home';
  document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} · Catfolio`;
});

export default router;
