<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppIcon from './AppIcon.vue';
import type { EventType } from '../../types';
defineProps<{ type: EventType; label: string; catId: string }>();
</script>

<template>
  <RouterLink
    :to="{ path: '/events/new', query: { type, cat: catId } }"
    class="quick-add-button"
  >
    <span
      class="quick-add-icon"
      :class="`tone-${type}`"
    ><AppIcon
      :name="type"
      :size="25"
    /></span><span>{{ label }}</span>
  </RouterLink>
</template>
