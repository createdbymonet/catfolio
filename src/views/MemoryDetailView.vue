<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import CatAvatar from '../components/common/CatAvatar.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { formatDate } from '../utils/date';

const route = useRoute();
const { cats, memories, toggleFavorite, updateMemory } = useCatfolio();
const memory = computed(() => memories.value.find((item) => item.id === route.params.id));
const cat = computed(() => cats.value.find((item) => item.id === memory.value?.catId));
const editing = ref(false);
const title = ref('');
const memo = ref('');
const error = ref('');
watch(() => route.params.id, () => { editing.value = false; error.value = ''; });

function startEditing() {
  if (!memory.value) return;
  title.value = memory.value.title;
  memo.value = memory.value.memo;
  error.value = '';
  editing.value = true;
}
function saveMemory() {
  if (!memory.value) return;
  if (!title.value.trim()) { error.value = 'Give this memory a title.'; return; }
  updateMemory(memory.value.id, { title: title.value.trim(), memo: memo.value.trim() });
  editing.value = false;
}
</script>

<template>
  <div class="page">
    <AppHeader
      title="Memory"
      back-to="/memories"
    >
      <template
        v-if="memory"
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
      class="page-content memory-detail"
    >
      <template v-if="memory && cat">
        <div class="memory-photo">
          <img
            :src="memory.image"
            :alt="`${memory.title} — ${cat.name}`"
          >
          <button
            type="button"
            class="icon-button photo-heart"
            :class="{ 'is-favorite': memory.favorite }"
            :aria-label="memory.favorite ? 'Remove from favorites' : 'Add to favorites'"
            :aria-pressed="memory.favorite"
            @click="toggleFavorite(memory.id)"
          >
            <AppIcon
              name="heart"
              :size="23"
            />
          </button>
        </div>
        <form
          v-if="editing"
          class="section-card stack memory-edit"
          @submit.prevent="saveMemory"
        >
          <div class="field">
            <label
              for="memory-title"
              class="field-label"
            >Memory title</label>
            <input
              id="memory-title"
              v-model="title"
              class="form-control"
              required
              maxlength="80"
              :aria-invalid="!!error"
              :aria-describedby="error ? 'memory-error' : undefined"
            >
          </div>
          <div class="field">
            <label
              for="memory-memo"
              class="field-label"
            >Memo</label>
            <textarea
              id="memory-memo"
              v-model="memo"
              class="form-control"
              rows="4"
              maxlength="2000"
            />
          </div>
          <p
            v-if="error"
            id="memory-error"
            class="error-message"
            role="alert"
          >
            {{ error }}
          </p>
          <button
            class="primary-button"
            type="submit"
          >
            Save changes
          </button>
        </form>
        <template v-else>
          <div class="memory-heading">
            <p class="eyebrow">
              A moment to keep
            </p>
            <h1 class="page-title">
              {{ memory.title }}
            </h1>
            <p class="memory-date muted">
              <AppIcon
                name="calendar"
                :size="15"
              /> {{ formatDate(memory.date) }}
            </p>
          </div>
          <RouterLink
            :to="`/cats/${cat.id}`"
            class="memory-cat"
          >
            <CatAvatar
              :cat="cat"
              :size="35"
            />
            <span>{{ cat.name }}</span>
            <AppIcon
              name="chevron-right"
              :size="17"
            />
          </RouterLink>
          <section class="section-card memory-memo">
            <h2 class="section-heading">
              Memo
            </h2>
            <p>{{ memory.memo || 'A little moment, saved forever.' }}</p>
          </section>
          <div class="chip-row memory-tags">
            <span
              v-if="memory.favorite"
              class="chip favorite-tag"
            ><AppIcon
              name="heart"
              :size="14"
            /> Favorite</span>
            <RouterLink
              :to="`/cats/${cat.id}`"
              class="chip"
            >
              <AppIcon
                name="cat"
                :size="14"
              /> {{ cat.name }}
            </RouterLink>
          </div>
        </template>
      </template>
      <div
        v-else
        class="empty-state section-card"
      >
        <AppIcon
          name="memory"
          :size="36"
        />
        <h1>Memory not found</h1>
        <p>This memory is no longer in this demo session.</p>
        <RouterLink
          to="/memories"
          class="primary-button"
        >
          Back to memories
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.memory-photo {
  position: relative;
  overflow: hidden;
  border-radius: 23px;
  background: var(--surface);
  img { display: block; width: 100%; aspect-ratio: 1.03; object-fit: cover; }
}
.photo-heart { position: absolute; right: 14px; bottom: 14px; width: 44px; height: 44px; border-radius: 50%; background: var(--surface); box-shadow: 0 2px 10px color-mix(in srgb, var(--text) 10%, transparent); }
.photo-heart.is-favorite { color: var(--health); :deep(svg) { fill: currentColor; } }
.memory-heading { margin: 24px 0 20px; .eyebrow { margin-bottom: 8px; } h1 { margin: 0; font-size: 26px; overflow-wrap: anywhere; } }
.memory-date { display: flex; align-items: center; gap: 7px; margin: 11px 0 0; font-size: 12px; }
.memory-cat { display: flex; align-items: center; gap: 10px; color: var(--text); text-decoration: none; font-weight: 600; font-size: 13px; > span { min-width: 0; overflow-wrap: anywhere; } > :last-child { margin-left: auto; flex-shrink: 0; } }
.memory-memo { margin-top: 22px; p { margin: 12px 0 0; color: var(--text-muted); font-size: 13px; line-height: 1.9; white-space: pre-wrap; overflow-wrap: anywhere; } }
.memory-tags { margin-top: 18px; .chip { display: inline-flex; gap: 6px; align-items: center; text-decoration: none; } }
.favorite-tag { color: var(--health); border-color: color-mix(in srgb, var(--health) 40%, transparent); background: color-mix(in srgb, var(--health) 7%, var(--surface)); }
.memory-edit { margin-top: 22px; }
</style>
