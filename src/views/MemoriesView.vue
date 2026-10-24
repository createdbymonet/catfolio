<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import MemoryCard from '../components/cards/MemoryCard.vue';
import { useCatfolio } from '../composables/useCatfolio';

const { cats, memories, toggleFavorite } = useCatfolio();
const selectedCat = ref('all');
const favoritesOnly = ref(false);
const visibleMemories = computed(() => memories.value.flatMap((memory) => {
  const cat = cats.value.find((item) => item.id === memory.catId);
  if (!cat || (selectedCat.value !== 'all' && memory.catId !== selectedCat.value) || (favoritesOnly.value && !memory.favorite)) return [];
  return [{ memory, cat }];
}));
</script>

<template>
  <div class="page">
    <AppHeader title="Memories">
      <template #action>
        <RouterLink
          to="/events/new?type=memory"
          class="icon-button"
          aria-label="Add a memory"
        >
          <AppIcon
            name="plus"
            :size="22"
          />
        </RouterLink>
      </template>
    </AppHeader>
    <main
      id="main-content"
      class="page-content memories-page"
    >
      <p class="memories-intro muted">
        Little moments. A lifetime of love.
      </p>
      <div class="memories-filters">
        <label class="cat-filter">
          <AppIcon
            name="cat"
            :size="17"
          />
          <span class="sr-only">Filter memories by cat</span>
          <select
            v-model="selectedCat"
            aria-label="Filter memories by cat"
          >
            <option value="all">All cats</option>
            <option
              v-for="cat in cats"
              :key="cat.id"
              :value="cat.id"
            >{{ cat.name }}</option>
          </select>
        </label>
        <button
          type="button"
          class="chip favorite-filter"
          :class="{ 'is-active': favoritesOnly }"
          :aria-pressed="favoritesOnly"
          @click="favoritesOnly = !favoritesOnly"
        >
          <AppIcon
            name="heart"
            :size="16"
          /> Favorites
        </button>
      </div>
      <p
        class="memories-count muted"
        role="status"
      >
        {{ visibleMemories.length }} {{ visibleMemories.length === 1 ? 'memory' : 'memories' }} to treasure
      </p>
      <div
        v-if="visibleMemories.length"
        class="memories-grid"
      >
        <MemoryCard
          v-for="item in visibleMemories"
          :key="item.memory.id"
          :memory="item.memory"
          :cat="item.cat"
          @favorite="toggleFavorite"
        />
      </div>
      <div
        v-else
        class="empty-state section-card"
      >
        <AppIcon
          name="memory"
          :size="36"
        />
        <h2>No memories here yet</h2>
        <p>{{ favoritesOnly ? 'Tap a heart on a memory to keep it close.' : 'Save a little moment with your cat.' }}</p>
        <button
          v-if="favoritesOnly"
          type="button"
          class="secondary-button"
          @click="favoritesOnly = false"
        >
          See all memories
        </button>
        <RouterLink
          v-else
          to="/events/new?type=memory"
          class="primary-button"
        >
          Add a memory
        </RouterLink>
      </div>
      <p class="memories-footer">
        <AppIcon
          name="heart"
          :size="13"
        /> The little things are the big things.
      </p>
    </main>
  </div>
</template>

<style scoped lang="scss">
.memories-intro { margin: -3px 0 23px; font-size: 13px; }
.memories-filters { display: flex; gap: 9px; align-items: center; }
.cat-filter {
  display: flex;
  flex: 1;
  min-width: 0;
  max-width: 190px;
  gap: 7px;
  align-items: center;
  min-height: 39px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 99px;
  background: var(--surface);
  color: var(--text);
  select { width: 100%; min-width: 0; padding: 8px 0; border: 0; color: inherit; background: transparent; font: inherit; font-size: 12px; cursor: pointer; }
}
.favorite-filter { display: inline-flex; gap: 6px; align-items: center; }
.memories-count { margin: 20px 0 12px; font-size: 11px; letter-spacing: 0.02em; }
.memories-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 12px; }
.memories-footer { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 25px 0 3px; color: var(--secondary-ink); font-size: 11px; svg { color: var(--secondary); } }
</style>
