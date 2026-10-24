<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import CatAvatar from '../components/common/CatAvatar.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { eventTypes } from '../mocks';
import { formatDate, formatTime } from '../utils/date';

const route = useRoute();
const router = useRouter();
const { cats, events, deleteEvent } = useCatfolio();
const event = computed(() => events.value.find((item) => item.id === route.params.id));
const cat = computed(() => cats.value.find((item) => item.id === event.value?.catId));
const typeLabel = computed(() => eventTypes.find((item) => item.value === event.value?.type)?.label ?? 'Event');

function removeEvent() {
  if (!event.value) return;
  deleteEvent(event.value.id);
  void router.replace('/timeline');
}
</script>

<template>
  <main class="page event-detail-page">
    <AppHeader
      title="Event detail"
      back-to="/timeline"
    >
      <template
        v-if="event"
        #action
      >
        <RouterLink
          class="text-button"
          :to="{ path: '/events/new', query: { edit: event.id } }"
        >
          Edit
        </RouterLink>
      </template>
    </AppHeader>
    <div
      v-if="event"
      class="page-content stack"
    >
      <section class="event-hero">
        <div
          class="event-symbol hero-symbol"
          :class="`tone-${event.type}`"
        >
          <AppIcon
            :name="event.type"
            :size="30"
          />
        </div>
        <p class="eyebrow">
          {{ typeLabel }}
        </p>
        <h2 class="page-title">
          {{ event.title }}
        </h2>
        <p class="event-date muted">
          {{ formatDate(event.date) }} <span aria-hidden="true">·</span> {{ formatTime(event.date) }}
        </p>
      </section>

      <section
        class="section-card event-info"
        aria-label="Event information"
      >
        <dl class="detail-list">
          <div>
            <dt>Cat</dt>
            <dd
              v-if="cat"
              class="cat-meta"
            >
              <CatAvatar
                :cat="cat"
                :size="29"
              /> {{ cat.name }}
            </dd>
            <dd v-else>
              Unknown cat
            </dd>
          </div>
          <div>
            <dt>Event type</dt>
            <dd>{{ typeLabel }}</dd>
          </div>
          <div v-if="event.severity">
            <dt>Severity</dt>
            <dd>
              <span
                class="severity-chip"
                :class="`severity-${event.severity}`"
              >{{ event.severity }}</span>
            </dd>
          </div>
          <div>
            <dt>Recorded by</dt>
            <dd>{{ event.recordedBy }}</dd>
          </div>
        </dl>
      </section>

      <section class="section-card memo-card">
        <h2 class="section-heading">
          Details
        </h2>
        <p
          v-if="event.memo"
          class="event-memo"
        >
          {{ event.memo }}
        </p>
        <p
          v-else
          class="muted event-memo"
        >
          No extra notes for this little update.
        </p>
      </section>

      <section
        v-if="event.image"
        class="event-photo-section"
      >
        <h2 class="section-heading">
          Photo
        </h2>
        <img
          class="event-photo"
          :src="event.image"
          :alt="`${event.title}${cat ? ` — ${cat.name}` : ''}`"
        >
      </section>

      <button
        class="delete-event secondary-button"
        type="button"
        @click="removeEvent"
      >
        <AppIcon
          name="trash"
          :size="18"
        /> Delete event
      </button>
    </div>
    <div
      v-else
      class="page-content"
    >
      <div class="empty-state section-card">
        <AppIcon
          name="note"
          :size="32"
        />
        <h2 class="section-heading">
          Event not found
        </h2>
        <p class="muted">
          This event may have been deleted or the demo was refreshed.
        </p>
        <RouterLink
          class="primary-button"
          to="/timeline"
        >
          Back to timeline
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.event-hero { display: flex; flex-direction: column; align-items: center; padding: 10px 0 12px; text-align: center; }
.hero-symbol { display: grid; place-items: center; width: 70px; height: 70px; margin-bottom: 19px; border-radius: 23px; background: color-mix(in srgb, var(--primary) 13%, var(--surface)); color: var(--primary-dark); }
.hero-symbol.tone-health { background: color-mix(in srgb, var(--health) 14%, var(--surface)); color: var(--health); }
.hero-symbol.tone-medical { background: color-mix(in srgb, var(--medical) 14%, var(--surface)); color: var(--medical); }
.hero-symbol.tone-memory { background: color-mix(in srgb, var(--memory) 16%, var(--surface)); color: var(--memory); }
.event-hero .eyebrow { margin: 0 0 8px; }
.event-hero h2 { margin: 0; overflow-wrap: anywhere; font-size: 25px; }
.event-date { margin: 12px 0 0; font-size: 12px; }
.event-date span { padding: 0 6px; }
.event-info { padding-top: 4px; padding-bottom: 4px; }
.cat-meta { display: flex; align-items: center; gap: 8px; }
.severity-chip { display: inline-flex; padding: 5px 10px; border-radius: 20px; background: color-mix(in srgb, var(--health) 12%, var(--surface)); color: var(--health-ink); font-size: 12px; text-transform: capitalize; }
.severity-moderate { background: color-mix(in srgb, var(--primary) 17%, var(--surface)); color: var(--action-ink); }
.severity-severe { background: var(--health-ink); color: var(--surface); }
.event-memo { margin: 12px 0 0; font-size: 14px; line-height: 1.8; white-space: pre-wrap; overflow-wrap: anywhere; }
.event-photo-section h2 { margin: 0 0 12px; }
.event-photo { display: block; width: 100%; max-height: 360px; border-radius: 20px; object-fit: cover; }
.delete-event { width: 100%; margin-top: 8px; border-color: color-mix(in srgb, var(--health) 55%, var(--border)); color: var(--health-ink); }
</style>
