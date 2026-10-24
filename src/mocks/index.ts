import type { CareTask, Cat, CatEvent, Memory } from '../types';

export { eventTypes } from '../types';

export const mockCats: Cat[] = [
  {
    id: 'sumi',
    name: 'Sumi',
    breed: 'Domestic shorthair',
    sex: 'Female',
    age: '3 years old',
    weight: 4.2,
    nextCheckup: '2026-11-12',
    avatar: '/images/sumi.svg',
    description: 'A little sunbeam seeker with a very big personality.',
    medication: 'Daily supplement · twice a day',
    healthStatus: 'Doing well',
  },
  {
    id: 'hana',
    name: 'Hana',
    breed: 'Scottish fold mix',
    sex: 'Female',
    age: '2 years old',
    weight: 3.6,
    nextCheckup: '2026-11-20',
    avatar: '/images/hana.svg',
    description: 'Gentle, curious, and always ready for a cozy nap.',
    medication: 'Daily supplement · twice a day',
    healthStatus: 'Doing well',
  },
  {
    id: 'mugi',
    name: 'Mugi',
    breed: 'Domestic shorthair',
    sex: 'Male',
    age: '4 years old',
    weight: 5.1,
    nextCheckup: '2026-12-03',
    avatar: '/images/mugi.svg',
    description: 'Our playful ginger boy and professional snack inspector.',
    medication: 'Daily supplement · twice a day',
    healthStatus: 'Doing well',
  },
];

export const mockEvents: CatEvent[] = [
  {
    id: 'event-food', catId: 'sumi', type: 'food', date: '2026-10-24T12:30',
    title: 'Lunch time', memo: 'Finished her wet food. A good appetite today.', recordedBy: 'Moe',
  },
  {
    id: 'event-health', catId: 'sumi', type: 'health', date: '2026-10-24T10:15',
    title: 'A little sneeze', memo: 'Sneezed a few times this morning. Appetite and energy are normal. Keeping an eye on her.',
    recordedBy: 'Moe', severity: 'mild',
  },
  {
    id: 'event-memory', catId: 'sumi', type: 'memory', date: '2026-10-24T09:30',
    title: 'A little moment of sunshine', memo: 'Found her favorite sunny spot by the window.', recordedBy: 'Moe',
    image: '/images/memory-1.svg',
  },
  {
    id: 'event-toilet', catId: 'hana', type: 'toilet', date: '2026-10-24T09:00',
    title: 'All looking normal', memo: 'Litter box checked and cleaned. Everything looks normal.', recordedBy: 'Moe',
  },
  {
    id: 'event-medication', catId: 'sumi', type: 'medication', date: '2026-10-24T08:00',
    title: 'Morning medication', memo: 'Daily supplement taken with breakfast.', recordedBy: 'Moe',
  },
  {
    id: 'event-vet', catId: 'sumi', type: 'medical', date: '2026-10-23T15:00',
    title: 'Regular vet checkup', memo: 'Routine checkup at the clinic. Weight is stable at 4.2 kg. Next visit on November 12.', recordedBy: 'Moe',
  },
  {
    id: 'event-note', catId: 'mugi', type: 'note', date: '2026-10-23T11:00',
    title: 'A new favorite toy', memo: 'The little felt mouse was a big hit. Lots of playtime after breakfast.', recordedBy: 'Moe',
  },
  {
    id: 'event-food-hana', catId: 'hana', type: 'food', date: '2026-10-23T08:30',
    title: 'Breakfast', memo: 'Ate her usual portion and had some water.', recordedBy: 'Moe',
  },
];

export const mockMemories: Memory[] = [
  {
    id: 'memory-sunbeam', eventId: 'event-memory', catId: 'sumi', title: 'A little moment of sunshine', date: '2026-10-24T09:30',
    memo: 'A slow morning, a warm sunbeam, and her favorite spot by the window. These are the little moments I want to remember.',
    favorite: true, image: '/images/memory-1.svg',
  },
  {
    id: 'memory-cozy', catId: 'hana', title: 'Cozy little afternoon', date: '2026-10-23T14:00',
    memo: 'Curled up in the softest blanket in the house.', favorite: false, image: '/images/memory-2.svg',
  },
  {
    id: 'memory-curious', catId: 'mugi', title: 'Always a little curious', date: '2026-10-21T11:15',
    memo: 'Watching the leaves dance outside. So many things to investigate.', favorite: true, image: '/images/memory-3.svg',
  },
  {
    id: 'memory-nap', catId: 'sumi', title: 'The art of doing nothing', date: '2026-10-19T15:30',
    memo: 'An excellent afternoon nap, with one tiny paw tucked under her chin.', favorite: false, image: '/images/memory-4.svg',
  },
  {
    id: 'memory-playtime', catId: 'hana', title: 'Just one more game', date: '2026-10-17T10:00',
    memo: 'A busy morning chasing her favorite toy around the living room.', favorite: false, image: '/images/memory-5.svg',
  },
  {
    id: 'memory-window', catId: 'mugi', title: 'Little window watcher', date: '2026-10-15T16:00',
    memo: 'Keeping a careful eye on the neighborhood birds.', favorite: true, image: '/images/memory-6.svg',
  },
];

export const mockCareTasks: CareTask[] = mockCats.flatMap((cat) => [
  {
    id: `${cat.id}-morning`, catId: cat.id, time: '08:00', title: 'Medication',
    detail: 'Morning supplement · with food', done: false,
  },
  {
    id: `${cat.id}-evening`, catId: cat.id, time: '18:00', title: 'Medication',
    detail: 'Evening supplement · with food', done: false,
  },
]);
