export type EventType =
  | 'medication'
  | 'food'
  | 'toilet'
  | 'health'
  | 'medical'
  | 'memory'
  | 'note';

export interface Cat {
  id: string;
  name: string;
  breed: string;
  sex: string;
  age: string;
  weight: number;
  nextCheckup: string;
  avatar: string;
  description: string;
  medication: string;
  healthStatus: string;
}

export interface CatEvent {
  id: string;
  catId: string;
  type: EventType;
  date: string;
  title: string;
  memo: string;
  recordedBy: string;
  severity?: 'mild' | 'moderate' | 'severe';
  image?: string;
}

export interface Memory {
  id: string;
  eventId?: string;
  catId: string;
  title: string;
  date: string;
  memo: string;
  favorite: boolean;
  image: string;
}

export interface CareTask {
  id: string;
  catId: string;
  time: string;
  title: string;
  detail: string;
  done: boolean;
}

export const eventTypes: { value: EventType; label: string; icon: EventType }[] = [
  { value: 'medication', label: 'Medication', icon: 'medication' },
  { value: 'food', label: 'Food', icon: 'food' },
  { value: 'toilet', label: 'Toilet', icon: 'toilet' },
  { value: 'health', label: 'Health', icon: 'health' },
  { value: 'medical', label: 'Medical', icon: 'medical' },
  { value: 'memory', label: 'Memory', icon: 'memory' },
  { value: 'note', label: 'Note', icon: 'note' },
];
