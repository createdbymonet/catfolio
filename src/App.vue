<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import BottomNavigation from './components/navigation/BottomNavigation.vue';
const route = useRoute();
</script>

<template>
  <div
    class="app-shell"
    :class="{ 'has-navigation': route.path !== '/login' }"
  >
    <RouterView />
    <BottomNavigation v-if="route.path !== '/login'" />
  </div>
</template>
