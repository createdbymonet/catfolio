import { computed, ref } from 'vue';
import { mockCareTasks, mockCats, mockEvents, mockMemories } from '../mocks';
import type { CareTask, Cat, CatEvent, Memory } from '../types';

// Shared only for this browser session. Reloading restores the demo records.
const cats = ref<Cat[]>(mockCats.map((cat) => ({ ...cat })));
const events = ref<CatEvent[]>(mockEvents.map((event) => ({ ...event })));
const memories = ref<Memory[]>(mockMemories.map((memory) => ({ ...memory })));
const careTasks = ref<CareTask[]>(mockCareTasks.map((task) => ({ ...task })));
const activeCatId = ref('sumi');
const userName = ref('Moe');
const activeCat = computed(() => cats.value.find((cat) => cat.id === activeCatId.value) ?? cats.value[0]!);
let eventSequence = 0;

function setActiveCat(id: string): void {
  if (cats.value.some((cat) => cat.id === id)) activeCatId.value = id;
}

function toggleCare(id: string): void {
  const task = careTasks.value.find((item) => item.id === id);
  if (task) task.done = !task.done;
}

function toggleFavorite(id: string): void {
  const memory = memories.value.find((item) => item.id === id);
  if (memory) memory.favorite = !memory.favorite;
}

function removeLinkedMemory(eventId: string): void {
  const index = memories.value.findIndex((memory) => memory.eventId === eventId);
  if (index !== -1) memories.value.splice(index, 1);
}

function syncEventMemory(event: CatEvent): void {
  if (event.type !== 'memory') {
    removeLinkedMemory(event.id);
    return;
  }

  const fallbackImage = event.catId === 'hana' ? 2 : event.catId === 'mugi' ? 3 : 1;
  const fields = {
    catId: event.catId,
    title: event.title,
    date: event.date,
    memo: event.memo,
    image: event.image || `/images/memory-${fallbackImage}.svg`,
  };
  const memory = memories.value.find((item) => item.eventId === event.id);
  if (memory) {
    // Keep the existing ID and favorite when editing the timeline record.
    Object.assign(memory, fields);
  } else {
    memories.value.unshift({
      ...fields, id: `memory-${event.id}`, eventId: event.id, favorite: false,
    });
  }
}

function saveEvent(data: Omit<CatEvent, 'id'>, id?: string): CatEvent {
  const existing = id ? events.value.find((event) => event.id === id) : undefined;
  if (existing) {
    Object.assign(existing, data);
    syncEventMemory(existing);
    return existing;
  }

  const event: CatEvent = { ...data, id: `event-local-${Date.now()}-${++eventSequence}` };
  events.value.unshift(event);
  syncEventMemory(event);
  return event;
}

function deleteEvent(id: string): void {
  const index = events.value.findIndex((event) => event.id === id);
  if (index !== -1) events.value.splice(index, 1);
  removeLinkedMemory(id);
}

function updateMemory(id: string, changes: Partial<Pick<Memory, 'title' | 'memo'>>): void {
  const memory = memories.value.find((item) => item.id === id);
  if (memory) {
    Object.assign(memory, changes);
    const event = events.value.find((item) => item.id === memory.eventId);
    if (event) Object.assign(event, changes);
  }
}

function updateCat(id: string, changes: Partial<Pick<Cat, 'name' | 'weight' | 'nextCheckup'>>): void {
  const cat = cats.value.find((item) => item.id === id);
  if (cat) Object.assign(cat, changes);
}

// The login view accepts any non-empty username/password. Only the display name
// reaches this module; credentials are never persisted or sent anywhere.
function login(name: string): void {
  userName.value = name.trim() || 'Viewer';
}

export function useCatfolio() {
  return {
    cats, events, memories, careTasks, activeCatId, userName, activeCat,
    setActiveCat, toggleCare, toggleFavorite, saveEvent, deleteEvent, updateMemory, updateCat, login,
  };
}
