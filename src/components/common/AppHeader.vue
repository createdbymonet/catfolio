<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppIcon from './AppIcon.vue';
defineProps<{ title: string; backTo?: string }>();
</script>

<template>
  <header class="app-header">
    <div class="header-leading">
      <RouterLink
        v-if="backTo"
        :to="backTo"
        class="icon-button back-button"
        aria-label="Go back"
      >
        <AppIcon name="chevron-left" />
      </RouterLink>
      <h1>{{ title }}</h1>
    </div>
    <div class="header-action">
      <slot name="action" />
    </div>
  </header>
</template>
