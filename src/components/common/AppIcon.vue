<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 22 });

const paths: Record<string, string> = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  timeline: 'M8 5h13M8 12h13M8 19h13M3 4v2M3 11v2M3 18v2',
  plus: 'M12 5v14M5 12h14',
  memory: 'M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M9 8h.01',
  camera: 'M3 7h4l2-3h6l2 3h4v13H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  cat: 'M4 10 3 3l6 4a12 12 0 0 1 6 0l6-4-1 7a8 8 0 1 1-16 0ZM8 12h.01M16 12h.01m-5 3 1 1 1-1M1 13l4 1M19 14l4-1M2 17h4m12 0h4',
  paw: 'M8 14c-2 2-4 6 0 6 2 0 2-1 4-1s2 1 4 1c4 0 2-4 0-6s-6-2-8 0ZM7 7c0 3-4 3-4 0s4-3 4 0Zm5-3c0 3-4 3-4 0s4-3 4 0Zm4 0c0 3-4 3-4 0s4-3 4 0Zm5 3c0 3-4 3-4 0s4-3 4 0Z',
  medication: 'm9 15 6-6m-9 9a4.2 4.2 0 0 1 0-6l6-6a4.2 4.2 0 0 1 6 6l-6 6a4.2 4.2 0 0 1-6 0Zm3-9 6 6',
  food: 'M3 12h18a9 9 0 0 1-18 0Zm1 9h16M8 8V5m4 3V3m4 5V5',
  toilet: 'M3 9h18l-2 11H5ZM2 9V6h20v3M8 14h8',
  health: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8ZM3 12h5l2-4 4 8 2-4h5',
  medical: 'M9 3h6v5h5v6h-5v6H9v-6H4V8h5Z',
  note: 'M5 3h14v18H5ZM9 8h6m-6 4h6m-6 4h3',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  check: 'm5 12 4 4L19 6',
  'chevron-left': 'm15 5-7 7 7 7',
  'chevron-right': 'm9 5 7 7-7 7',
  'chevron-down': 'm6 9 6 6 6-6',
  calendar: 'M4 5h16v16H4ZM8 3v4m8-4v4M4 10h16',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
  pencil: 'm14 5 5 5M4 20l5-1L21 7l-5-5L4 14Z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  weight: 'M4 7h16l2 14H2ZM8 7a4 4 0 0 1 8 0M12 7l2-3',
  logout: 'M9 4H4v16h5m6-13 5 5-5 5m-7-5h12',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1',
  close: 'm6 6 12 12M6 18 18 6',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
};
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="app-icon"
  >
    <path :d="paths[name] || paths.cat" />
  </svg>
</template>
