<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import CatAvatar from '../components/common/CatAvatar.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { formatDate } from '../utils/date';

const route = useRoute();
const { cats, events, setActiveCat, updateCat } = useCatfolio();
const cat = computed(() => cats.value.find((item) => item.id === route.params.id));
const catEvents = computed(() => events.value.filter((item) => item.catId === cat.value?.id).sort((a, b) => b.date.localeCompare(a.date)));
const recentHealth = computed(() => catEvents.value.find((item) => item.type === 'health'));
const latestVet = computed(() => catEvents.value.find((item) => item.type === 'medical'));
const editing = ref(false);
const name = ref('');
const weight = ref(0);
const nextCheckup = ref('');
const error = ref('');
watch(cat, (value) => { if (value) setActiveCat(value.id); editing.value = false; error.value = ''; }, { immediate: true });

function startEditing() {
  if (!cat.value) return;
  name.value = cat.value.name;
  weight.value = cat.value.weight;
  nextCheckup.value = cat.value.nextCheckup;
  error.value = '';
  editing.value = true;
}
function saveProfile() {
  if (!cat.value) return;
  if (!name.value.trim() || !Number.isFinite(weight.value) || weight.value <= 0 || weight.value > 30 || !nextCheckup.value) {
    error.value = 'Enter a name, a weight between 0 and 30 kg, and a checkup date.';
    return;
  }
  updateCat(cat.value.id, { name: name.value.trim(), weight: weight.value, nextCheckup: nextCheckup.value });
  editing.value = false;
}
</script>

<template>
  <div class="page">
    <AppHeader
      title="Cat profile"
      back-to="/dashboard"
    >
      <template
        v-if="cat"
        #action
      >
        <button
          type="button"
          class="text-button"
          @click="editing ? (editing = false) : startEditing()"
        >
          {{ editing ? 'Cancel' : 'Edit' }}
        </button>
      </template>
    </AppHeader>
    <main
      id="main-content"
      class="page-content profile-page"
    >
      <template v-if="cat">
        <nav
          class="profile-switcher"
          aria-label="Choose a cat profile"
        >
          <RouterLink
            v-for="item in cats"
            :key="item.id"
            :to="`/cats/${item.id}`"
            class="chip"
            :class="{ 'is-active': item.id === cat.id }"
            :aria-current="item.id === cat.id ? 'page' : undefined"
          >
            {{ item.name }}
          </RouterLink>
        </nav>
        <section class="profile-hero">
          <div class="profile-avatar">
            <CatAvatar
              :cat="cat"
              :size="112"
            /><span class="profile-paw"><AppIcon
              name="cat"
              :size="18"
            /></span>
          </div>
          <h2>{{ cat.name }}</h2>
          <p>{{ cat.sex }} <span aria-hidden="true">·</span> {{ cat.breed }}</p>
          <span class="profile-age">{{ cat.age }}</span>
        </section>
        <form
          v-if="editing"
          class="section-card stack profile-edit"
          @submit.prevent="saveProfile"
        >
          <div class="field">
            <label
              for="cat-name"
              class="field-label"
            >Name</label>
            <input
              id="cat-name"
              v-model="name"
              class="form-control"
              required
              maxlength="30"
            >
          </div>
          <div class="field">
            <label
              for="cat-weight"
              class="field-label"
            >Latest weight (kg)</label>
            <input
              id="cat-weight"
              v-model.number="weight"
              type="number"
              class="form-control"
              min="0.1"
              max="30"
              step="0.1"
              required
            >
          </div>
          <div class="field">
            <label
              for="cat-checkup"
              class="field-label"
            >Next checkup</label>
            <input
              id="cat-checkup"
              v-model="nextCheckup"
              type="date"
              class="form-control"
              required
            >
          </div>
          <p
            v-if="error"
            class="error-message"
            role="alert"
          >
            {{ error }}
          </p>
          <button
            type="submit"
            class="primary-button"
          >
            Save changes
          </button>
        </form>
        <template v-else>
          <div class="profile-stats">
            <section class="section-card profile-stat">
              <AppIcon
                name="weight"
                :size="19"
              />
              <h2>Latest weight</h2>
              <p>{{ cat.weight.toFixed(1) }} <span>kg</span></p>
              <span class="muted">Looking healthy</span>
            </section>
            <section class="section-card profile-stat">
              <AppIcon
                name="calendar"
                :size="19"
              />
              <h2>Next checkup</h2>
              <p class="checkup-date">
                {{ formatDate(cat.nextCheckup, { month: 'short', day: 'numeric' }) }}
              </p>
              <span class="muted">Routine visit</span>
            </section>
          </div>
          <section class="profile-health">
            <div class="profile-section-title">
              <h2 class="section-heading">
                Health overview
              </h2><span class="health-status"><span />{{ cat.healthStatus }}</span>
            </div>
            <div class="section-card health-card">
              <div class="health-row">
                <span class="health-icon medication-icon"><AppIcon
                  name="medication"
                  :size="21"
                /></span>
                <div><h3>Active medication</h3><p>{{ cat.medication || 'No active medication' }}</p><span class="health-note">{{ cat.medication ? 'Part of the daily care routine' : 'One less thing to worry about' }}</span></div>
                <span
                  v-if="cat.medication"
                  class="status-tag"
                >Active</span>
              </div>
              <RouterLink
                v-if="recentHealth"
                :to="`/events/${recentHealth.id}`"
                class="health-row health-link"
              >
                <span class="health-icon health-event-icon"><AppIcon
                  name="health"
                  :size="21"
                /></span>
                <div><h3>Recent health event</h3><p>{{ recentHealth.title }}</p><span class="health-note">{{ formatDate(recentHealth.date, { month: 'short', day: 'numeric' }) }}{{ recentHealth.severity ? ` · ${recentHealth.severity}` : '' }}</span></div>
                <AppIcon
                  name="chevron-right"
                  :size="18"
                />
              </RouterLink>
              <div
                v-else
                class="health-row"
              >
                <span class="health-icon health-event-icon"><AppIcon
                  name="health"
                  :size="21"
                /></span>
                <div><h3>Recent health event</h3><p>No concerns recorded</p><span class="health-note">Keep an eye on the little things</span></div>
              </div>
              <RouterLink
                v-if="latestVet"
                :to="`/events/${latestVet.id}`"
                class="health-row health-link"
              >
                <span class="health-icon medical-icon"><AppIcon
                  name="medical"
                  :size="21"
                /></span>
                <div><h3>Latest vet visit</h3><p>{{ latestVet.title }}</p><span class="health-note">{{ formatDate(latestVet.date, { month: 'short', day: 'numeric' }) }}</span></div>
                <AppIcon
                  name="chevron-right"
                  :size="18"
                />
              </RouterLink>
              <div
                v-else
                class="health-row"
              >
                <span class="health-icon medical-icon"><AppIcon
                  name="medical"
                  :size="21"
                /></span>
                <div><h3>Latest vet visit</h3><p>No visit recorded yet</p><span class="health-note">Add a medical event after a visit</span></div>
              </div>
            </div>
          </section>
          <RouterLink
            :to="{ path: '/events/new', query: { cat: cat.id, type: 'health' } }"
            class="secondary-button profile-add"
          >
            <AppIcon
              name="plus"
              :size="18"
            /> Add a health record
          </RouterLink>
          <p class="profile-note muted">
            {{ cat.description }}
          </p>
        </template>
      </template>
      <div
        v-else
        class="empty-state section-card"
      >
        <AppIcon
          name="cat"
          :size="36"
        />
        <h2>Cat not found</h2>
        <p>Choose one of your cats from the dashboard.</p>
        <RouterLink
          to="/dashboard"
          class="primary-button"
        >
          Back to dashboard
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.profile-switcher { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; .chip { min-width: 69px; max-width: 100%; text-align: center; text-decoration: none; overflow-wrap: anywhere; } }
.profile-hero {
  padding: 28px 0 25px;
  text-align: center;
  h2 { margin: 14px 0 5px; font-size: 29px; font-weight: 650; letter-spacing: -0.03em; overflow-wrap: anywhere; }
  p { margin: 0 0 8px; color: var(--text-muted); font-size: 12px; }
}
.profile-avatar { position: relative; display: inline-flex; padding: 5px; border: 1px solid var(--border); border-radius: 50%; background: var(--surface); }
.profile-paw { position: absolute; right: 0; bottom: 2px; display: grid; width: 31px; height: 31px; place-items: center; border: 3px solid var(--background); border-radius: 50%; background: var(--primary); color: var(--surface); }
.profile-age { font-size: 11px; color: var(--secondary-ink); }
.profile-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.profile-stat {
  padding: 17px 15px;
  > svg { color: var(--secondary); }
  h2 { margin: 10px 0 8px; font-size: 11px; font-weight: 500; color: var(--text-muted); }
  p { margin: 0 0 6px; font-size: 25px; font-weight: 650; letter-spacing: -0.04em; span { font-size: 12px; font-weight: 400; } }
  .checkup-date { font-size: 22px; line-height: 1.4; }
  > span { font-size: 10px; }
}
.profile-health { margin-top: 27px; }
.profile-section-title { display: flex; gap: 8px; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.health-status { display: inline-flex; align-items: center; gap: 5px; color: var(--medical-ink); font-size: 10px; span { width: 5px; height: 5px; border-radius: 50%; background: var(--medical); } }
.health-card { padding: 0 15px; }
.health-row {
  display: flex;
  gap: 11px;
  align-items: center;
  padding: 18px 0;
  + .health-row { border-top: 1px solid color-mix(in srgb, var(--border) 45%, transparent); }
  > div { flex: 1; min-width: 0; }
  h3 { margin: 0 0 6px; font-size: 11px; font-weight: 500; color: var(--text-muted); }
  p { margin: 0 0 5px; font-size: 12px; font-weight: 600; overflow-wrap: anywhere; }
  > svg { flex-shrink: 0; color: var(--secondary); }
}
.health-link { color: inherit; text-decoration: none; }
.health-note { font-size: 10px; line-height: 1.5; color: var(--text-muted); }
.health-icon { display: grid; width: 37px; height: 37px; place-items: center; flex-shrink: 0; border-radius: 12px; }
.medication-icon { color: var(--primary-dark); background: color-mix(in srgb, var(--primary) 11%, var(--surface)); }
.health-event-icon { color: var(--health); background: color-mix(in srgb, var(--health) 11%, var(--surface)); }
.medical-icon { color: var(--medical); background: color-mix(in srgb, var(--medical) 11%, var(--surface)); }
.status-tag { padding: 4px 6px; color: var(--medical-ink); background: color-mix(in srgb, var(--medical) 10%, var(--surface)); border-radius: 6px; font-size: 9px; }
.profile-add { display: flex; gap: 7px; justify-content: center; margin-top: 18px; }
.profile-note { margin: 20px 6px 0; font-size: 11px; text-align: center; line-height: 1.8; }
</style>
