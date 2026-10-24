<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AppIcon from '../common/AppIcon.vue';
import type { Cat, Memory } from '../../types';
import { formatDate } from '../../utils/date';

defineProps<{ memory: Memory; cat: Cat }>();
defineEmits<{ favorite: [id: string] }>();
</script>

<template>
  <article class="memory-card">
    <RouterLink
      :to="`/memories/${memory.id}`"
      class="memory-card__link"
    >
      <img
        :src="memory.image"
        :alt="`${memory.title} — ${cat.name}`"
        loading="lazy"
        class="memory-card__image"
      >
      <div class="memory-card__caption">
        <h2>{{ memory.title }}</h2>
        <p>{{ cat.name }} <span aria-hidden="true">·</span> {{ formatDate(memory.date, { month: 'short', day: 'numeric' }) }}</p>
      </div>
    </RouterLink>
    <button
      type="button"
      class="memory-card__favorite icon-button"
      :class="{ 'is-favorite': memory.favorite }"
      :aria-label="`${memory.favorite ? 'Remove' : 'Add'} ${memory.title} ${memory.favorite ? 'from' : 'to'} favorites`"
      :aria-pressed="memory.favorite"
      @click="$emit('favorite', memory.id)"
    >
      <AppIcon
        name="heart"
        :size="19"
      />
    </button>
  </article>
</template>

<style scoped lang="scss">
.memory-card {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--border) 48%, transparent);
  border-radius: 17px;
  background: var(--surface);
}
.memory-card__link { display: block; color: inherit; text-decoration: none; }
.memory-card__image { display: block; width: 100%; aspect-ratio: 0.91; object-fit: cover; background: var(--background); }
.memory-card__caption {
  padding: 12px 11px 13px;
  h2 { margin: 0 0 5px; font-size: 13px; font-weight: 650; line-height: 1.4; overflow-wrap: anywhere; }
  p { margin: 0; color: var(--text-muted); font-size: 10px; line-height: 1.5; overflow-wrap: anywhere; }
}
.memory-card__favorite {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 34px;
  height: 34px;
  min-height: 34px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  color: var(--secondary);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--text) 8%, transparent);
  &.is-favorite { color: var(--health); }
  &.is-favorite :deep(svg) { fill: currentColor; }
}
</style>
