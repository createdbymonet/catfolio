<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import FilterChip from '../components/common/FilterChip.vue';
import EventCard from '../components/cards/EventCard.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { dateGroupLabel } from '../utils/date';
import type { EventType } from '../types';
const { cats, events } = useCatfolio();
const filter = ref('All');
const catFilter = ref('all');
const filterTypes: Record<string, EventType[]> = { Care: ['medication','food','toilet'], Health: ['health'], Medical: ['medical'], More: ['memory','note'] };
const groups = computed(() => {
  const filtered = events.value.filter((event) => (catFilter.value === 'all' || event.catId === catFilter.value) && (filter.value === 'All' || filterTypes[filter.value]?.includes(event.type))).slice().sort((a,b) => b.date.localeCompare(a.date));
  const dates = [...new Set(filtered.map((event) => event.date.slice(0,10)))];
  return dates.map((date) => ({date,events:filtered.filter((event) => event.date.startsWith(date))}));
});
</script>

<template>
  <main class="page timeline-page">
    <AppHeader title="Timeline">
      <template #action>
        <RouterLink
          to="/events/new"
          class="icon-button header-add"
          aria-label="Add event"
        >
          <AppIcon name="plus" />
        </RouterLink>
      </template>
    </AppHeader>
    <div class="page-content">
      <p class="page-subtitle">
        Their days, one little moment at a time.
      </p><div class="timeline-toolbar">
        <label class="select-chip"><AppIcon
          name="cat"
          :size="17"
        /><select
          v-model="catFilter"
          aria-label="Filter timeline by cat"
        ><option value="all">All cats</option><option
          v-for="cat in cats"
          :key="cat.id"
          :value="cat.id"
        >{{ cat.name }}</option></select><AppIcon
          name="chevron-down"
          :size="14"
        /></label>
      </div><div
        class="chip-row timeline-filters"
        aria-label="Filter events"
      >
        <FilterChip
          v-for="item in ['All','Care','Health','Medical','More']"
          :key="item"
          :active="filter === item"
          @select="filter = item"
        >
          {{ item }}
        </FilterChip>
      </div>
      <section
        v-for="group in groups"
        :key="group.date"
        class="timeline-group"
      >
        <h2 class="date-heading">
          {{ dateGroupLabel(group.date) }}<span>{{ group.events.length }} {{ group.events.length === 1 ? 'event' : 'events' }}</span>
        </h2><div class="section-card event-list">
          <EventCard
            v-for="event in group.events"
            :key="event.id"
            :event="event"
            :cat="cats.find((cat) => cat.id === event.catId)"
          />
        </div>
      </section>
      <div
        v-if="!groups.length"
        class="empty-state section-card"
      >
        <AppIcon
          name="timeline"
          :size="32"
        /><h2>No moments here yet</h2><p>Try another filter, or record something new.</p><RouterLink
          to="/events/new"
          class="text-button"
        >
          Add an event <AppIcon
            name="plus"
            :size="16"
          />
        </RouterLink>
      </div>
      <p class="timeline-end">
        A little record of a life well loved.
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.timeline-toolbar { margin: 24px 0 17px; }
.timeline-filters { display: grid; grid-template-columns: repeat(5,1fr); gap: 7px; .chip { padding: 9px 8px; justify-content: center; } }
.timeline-group { margin-top: 27px; }
.date-heading { font-size: 13px; display: flex; align-items: center; gap: 10px; margin: 0 0 12px; span { color: var(--text-muted); font-size: 10px; font-weight: 400; } }
.timeline-end { text-align: center; font-size: 10px; color: var(--secondary-ink); margin: 29px 0 8px; }
.header-add { color: var(--primary-dark); background: var(--primary-soft); border-radius: 50%; width: 33px; height: 33px; }
</style>
