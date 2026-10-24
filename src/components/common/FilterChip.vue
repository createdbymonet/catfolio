<script setup lang="ts">
defineProps<{ active?: boolean }>();
defineEmits<{ select: [] }>();
</script>

<template>
  <button
    type="button"
    class="chip"
    :class="{ 'is-active': active }"
    :aria-pressed="!!active"
    @click="$emit('select')"
  >
    <slot />
  </button>
</template>
