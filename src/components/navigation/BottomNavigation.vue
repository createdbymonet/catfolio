<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useCatfolio } from '../../composables/useCatfolio';
import AppIcon from '../common/AppIcon.vue';
const route = useRoute();
const { activeCatId } = useCatfolio();
const items = computed(() => [
  { label: 'Home', icon: 'home', to: '/dashboard', active: route.path === '/dashboard' },
  { label: 'Timeline', icon: 'timeline', to: '/timeline', active: route.path === '/timeline' || (route.path.startsWith('/events/') && route.path !== '/events/new') },
  { label: 'Add', icon: 'plus', to: '/events/new', active: route.path === '/events/new' },
  { label: 'Memories', icon: 'memory', to: '/memories', active: route.path.startsWith('/memories') },
  { label: 'Cats', icon: 'cat', to: `/cats/${activeCatId.value}`, active: route.path.startsWith('/cats') },
]);
</script>

<template>
  <nav
    class="bottom-navigation"
    aria-label="Main navigation"
  >
    <RouterLink
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      class="nav-item"
      :class="{ 'is-active': item.active, 'nav-add': item.label === 'Add' }"
      :aria-current="item.active ? 'page' : undefined"
    >
      <span class="nav-icon"><AppIcon
        :name="item.icon"
        :size="23"
      /></span><span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
