// The seeded prototype represents this day so labels remain consistent.
export const demoToday = '2026-10-24';

function parseLocalDate(value: string): Date {
  // Date-only values should stay on the same calendar day in every timezone.
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);
}

export function formatDate(value: string, options?: Intl.DateTimeFormatOptions): string {
  const date = parseLocalDate(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat('en-US', options ?? {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(date);
}

export function formatTime(value: string): string {
  const date = parseLocalDate(value);
  if (Number.isNaN(date.getTime())) return 'Time unavailable';
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date);
}

export function toDateTimeLocal(value?: string): string {
  const date = value ? parseLocalDate(value) : new Date();
  if (Number.isNaN(date.getTime())) return `${demoToday}T09:00`;
  const pad = (number: number) => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function dateGroupLabel(value: string): string {
  const calendarDate = value.slice(0, 10);
  if (calendarDate === demoToday) return 'Today';
  if (calendarDate === '2026-10-23') return 'Yesterday';
  return formatDate(value, { month: 'long', day: 'numeric', year: 'numeric' });
}
