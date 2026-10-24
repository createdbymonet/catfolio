<script setup lang="ts">
import type { CareTask } from '../../types';
import AppIcon from '../common/AppIcon.vue';
defineProps<{ task: CareTask }>();
defineEmits<{ toggle: [id: string] }>();
</script>

<template>
  <div
    class="care-task"
    :class="{ 'is-complete': task.done }"
  >
    <span class="care-time">{{ task.time }}</span><span class="care-task-copy"><strong>{{ task.title }}</strong><span>{{ task.detail }}</span></span>
    <button
      type="button"
      class="done-button"
      :aria-pressed="task.done"
      :aria-label="`${task.done ? 'Mark incomplete' : 'Mark done'}: ${task.time} ${task.title}`"
      @click="$emit('toggle', task.id)"
    >
      <AppIcon
        v-if="task.done"
        name="check"
        :size="15"
      />{{ task.done ? 'Done' : 'Done' }}
    </button>
  </div>
</template>
