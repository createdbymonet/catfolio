<script setup lang="ts">
import type { Cat } from '../../types';
withDefaults(defineProps<{ cat: Cat; size?: number }>(), { size: 48 });
</script>

<template>
  <img
    class="cat-avatar"
    :src="cat.avatar"
    :alt="`${cat.name}, illustrated cat portrait`"
    :width="size"
    :height="size"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
</template>
