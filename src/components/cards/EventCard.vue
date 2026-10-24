<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Cat, CatEvent } from '../../types';
import { eventTypes } from '../../mocks';
import { formatTime } from '../../utils/date';
import AppIcon from '../common/AppIcon.vue';
defineProps<{ event: CatEvent; cat?: Cat }>();
const label = (type: CatEvent['type']) => eventTypes.find((item) => item.value === type)?.label ?? type;
</script>

<template>
  <RouterLink
    :to="`/events/${event.id}`"
    class="event-card"
  >
    <span
      class="event-symbol"
      :class="`tone-${event.type}`"
    ><AppIcon :name="event.type" /></span>
    <span class="event-card-copy"><span class="event-card-title">{{ label(event.type) }}<span class="event-time">{{ formatTime(event.date) }}</span></span><span class="event-card-memo">{{ event.title }}</span><span class="event-card-cat">{{ cat?.name ?? 'Cat' }}</span></span>
    <AppIcon
      name="chevron-right"
      :size="17"
      class="muted"
    />
  </RouterLink>
</template>
