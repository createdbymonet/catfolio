<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import AppIcon from '../components/common/AppIcon.vue';
import CatAvatar from '../components/common/CatAvatar.vue';
import QuickAddButton from '../components/common/QuickAddButton.vue';
import CareCard from '../components/cards/CareCard.vue';
import EventCard from '../components/cards/EventCard.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { demoToday, formatDate } from '../utils/date';
import type { EventType } from '../types';
const { cats, activeCat, activeCatId, setActiveCat, careTasks, toggleCare, events, userName } = useCatfolio();
const tasks = computed(() => careTasks.value.filter((task) => task.catId === activeCatId.value));
const completed = computed(() => tasks.value.filter((task) => task.done).length);
const recentEvents = computed(() => events.value.filter((event) => event.catId === activeCatId.value).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3));
const quickActions: {type: EventType; label: string}[] = [{type: 'medication',label: 'Medication'},{type: 'food',label: 'Food'},{type: 'toilet',label: 'Toilet'},{type: 'health',label: 'Health'}];
</script>

<template>
  <main class="page dashboard-page">
    <header class="dashboard-header">
      <RouterLink
        class="wordmark"
        to="/dashboard"
      >
        <AppIcon
          name="cat"
          :size="27"
        />Catfolio<span>.</span>
      </RouterLink><RouterLink
        to="/login"
        class="icon-button account-button"
        aria-label="Return to demo login"
      >
        <AppIcon
          name="user"
          :size="20"
        />
      </RouterLink>
    </header>
    <div class="page-content">
      <section class="greeting">
        <p class="eyebrow">
          <AppIcon
            name="sun"
            :size="14"
          />{{ formatDate(demoToday, { weekday: 'long', month: 'short', day: 'numeric' }) }}
        </p><h1>Hello, {{ userName }}<span class="greeting-dot">.</span></h1><p>A good day to care for your little ones.</p>
      </section>
      <div
        class="cat-selector"
        aria-label="Choose active cat"
      >
        <button
          v-for="cat in cats"
          :key="cat.id"
          type="button"
          class="cat-choice"
          :class="{ 'is-active': activeCatId === cat.id }"
          :aria-pressed="activeCatId === cat.id"
          @click="setActiveCat(cat.id)"
        >
          <CatAvatar
            :cat="cat"
            :size="34"
          /><span>{{ cat.name }}</span><AppIcon
            v-if="activeCatId === cat.id"
            name="check"
            :size="13"
            class="cat-choice-check"
          />
        </button>
      </div>
      <section class="section-card today-care">
        <div class="section-heading">
          <h2>Today's care <span class="for-cat">for {{ activeCat.name }}</span></h2><span
            class="care-progress"
            :class="{ complete: completed === tasks.length }"
          >{{ completed }}/{{ tasks.length }} done</span>
        </div><CareCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="toggleCare"
        /><p
          v-if="completed === tasks.length"
          class="care-finished"
          role="status"
        >
          <AppIcon
            name="check"
            :size="14"
          />All cared for. A little peace of mind.
        </p>
      </section>
      <section class="quick-section">
        <div class="section-heading">
          <h2>Quick add</h2><span class="muted small">The everyday little things</span>
        </div><div class="quick-add-grid">
          <QuickAddButton
            v-for="action in quickActions"
            :key="action.type"
            :type="action.type"
            :label="action.label"
            :cat-id="activeCatId"
          />
        </div>
      </section>
      <section class="recent-section">
        <div class="section-heading">
          <h2>Recent activity</h2><RouterLink
            to="/timeline"
            class="text-button"
          >
            View all <AppIcon
              name="chevron-right"
              :size="14"
            />
          </RouterLink>
        </div><div class="section-card event-list">
          <EventCard
            v-for="event in recentEvents"
            :key="event.id"
            :event="event"
            :cat="activeCat"
          /><p
            v-if="!recentEvents.length"
            class="empty-state"
          >
            A fresh start. Add {{ activeCat.name }}'s first event.
          </p>
        </div>
      </section>
      <p class="dashboard-footer">
        <AppIcon
          name="paw"
          :size="14"
        />Every little moment matters.
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.dashboard-header { display: flex; align-items: center; justify-content: space-between; padding: 27px 24px 8px; }
.wordmark { display: flex; align-items: center; gap: 9px; font-size: 23px; font-weight: 750; letter-spacing: -.9px; svg, > span { color: var(--primary-dark); } > span { margin-left: -8px; } }
.account-button { border: 1px solid var(--line); border-radius: 50%; width: 36px; height: 36px; background: var(--surface); color: var(--secondary); }
.greeting { margin: 15px 0 25px; .eyebrow { display: flex; align-items: center; gap: 6px; text-transform: uppercase; font-size: 9px; letter-spacing: 1.25px; } h1 { font-size: 29px; letter-spacing: -.9px; margin: 10px 0 7px; line-height: 1.2; overflow-wrap: anywhere; } > p:last-child { color: var(--text-muted); font-size: 12px; margin: 0; } }
.greeting-dot { color: var(--primary); }
.cat-selector { display: flex; gap: 10px; margin-bottom: 23px; }
.cat-choice { position: relative; min-width: 0; flex: 1; display: flex; align-items: center; gap: 8px; padding: 9px 8px; border: 1px solid var(--line); border-radius: 15px; background: var(--surface); color: var(--text-muted); font-size: 12px; font-weight: 600; > span { min-width: 0; overflow-wrap: anywhere; } &.is-active { border-color: var(--primary); background: var(--primary-pale); color: var(--text); box-shadow: 0 0 0 1px var(--primary); } }
.cat-choice-check { position: absolute; bottom: 6px; left: 32px; background: var(--primary-dark); color: var(--surface); border: 2px solid var(--surface); border-radius: 50%; width: 15px; height: 15px; padding: 1px; }
.today-care { padding: 18px 17px 5px; .section-heading { margin-bottom: 3px; } h2 { font-size: 15px; } .for-cat { display: block; font-size: 10px; color: var(--text-muted); font-weight: 400; margin-top: 5px; } }
.care-progress { font-size: 9px; color: var(--action-ink); background: var(--primary-soft); border-radius: 20px; padding: 6px 8px; &.complete { color: var(--medical-ink); background: var(--medical-soft); } }
.care-finished { display: flex; align-items: center; gap: 5px; color: var(--medical-ink); font-size: 10px; padding-bottom: 6px; }
.quick-section,.recent-section { margin-top: 27px; }
.quick-add-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 9px; }
.dashboard-footer { display: flex; justify-content: center; align-items: center; gap: 6px; color: var(--secondary-ink); font-size: 10px; margin: 25px 0 0; }
</style>
