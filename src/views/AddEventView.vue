<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import AppHeader from '../components/common/AppHeader.vue';
import AppIcon from '../components/common/AppIcon.vue';
import CatAvatar from '../components/common/CatAvatar.vue';
import { useCatfolio } from '../composables/useCatfolio';
import { eventTypes } from '../mocks';
import type { CatEvent, EventType } from '../types';
import { demoToday, toDateTimeLocal } from '../utils/date';

const route = useRoute();
const router = useRouter();
const { cats, events, activeCatId, userName, setActiveCat, saveEvent } = useCatfolio();
const editId = computed(() => typeof route.query.edit === 'string' ? route.query.edit : undefined);
const existingEvent = computed(() => events.value.find((event) => event.id === editId.value));
const missingEvent = computed(() => Boolean(editId.value && !existingEvent.value));
const catId = ref('');
const eventType = ref<EventType>('medication');
const title = ref('');
const date = ref('');
const memo = ref('');
const severity = ref<NonNullable<CatEvent['severity']>>('mild');
const image = ref<string>();
const imageName = ref('');
const photoInput = ref<HTMLInputElement>();
const readingPhoto = ref(false);
const errors = ref<Record<string, string>>({});

function defaultTitle(type: EventType) {
  return eventTypes.find((event) => event.value === type)?.label ?? 'Note';
}

watch(() => route.fullPath, () => {
  const event = existingEvent.value;
  const queryType = eventTypes.find((item) => item.value === route.query.type)?.value;
  const queryCat = cats.value.find((cat) => cat.id === route.query.cat)?.id;
  catId.value = event?.catId ?? queryCat ?? activeCatId.value;
  eventType.value = event?.type ?? queryType ?? 'medication';
  title.value = event?.title ?? defaultTitle(eventType.value);
  date.value = toDateTimeLocal(event?.date ?? `${demoToday}T12:00:00`);
  memo.value = event?.memo ?? '';
  severity.value = event?.severity ?? 'mild';
  image.value = event?.image;
  imageName.value = '';
  errors.value = {};
}, { immediate: true });

function selectType(type: EventType) {
  if (!title.value || title.value === defaultTitle(eventType.value)) title.value = defaultTitle(type);
  eventType.value = type;
}

function removePhoto() {
  image.value = undefined;
  imageName.value = '';
  if (photoInput.value) photoInput.value.value = '';
}

function choosePhoto(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  delete errors.value.photo;
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    errors.value.photo = 'Please choose an image file.';
    input.value = '';
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    errors.value.photo = 'Choose an image smaller than 5 MB.';
    input.value = '';
    return;
  }
  readingPhoto.value = true;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      image.value = reader.result;
      imageName.value = file.name;
    }
    readingPhoto.value = false;
  };
  reader.onerror = () => {
    errors.value.photo = 'This image could not be read. Please try another.';
    readingPhoto.value = false;
  };
  reader.readAsDataURL(file);
}

function submit() {
  const nextErrors: Record<string, string> = {};
  if (!cats.value.some((cat) => cat.id === catId.value)) nextErrors.cat = 'Choose a cat for this event.';
  if (!eventTypes.some((type) => type.value === eventType.value)) nextErrors.type = 'Choose an event type.';
  if (!date.value || Number.isNaN(new Date(date.value).getTime())) nextErrors.date = 'Enter a valid date and time.';
  if (!title.value.trim()) nextErrors.title = 'Give this event a short title.';
  if (readingPhoto.value) nextErrors.photo = 'Please wait for the image preview to finish.';
  errors.value = nextErrors;
  if (Object.keys(nextErrors).length || missingEvent.value) return;

  const saved = saveEvent({
    catId: catId.value,
    type: eventType.value,
    // Keep local wall-clock time consistent with the seeded, frontend-only data.
    date: date.value,
    title: title.value.trim(),
    memo: memo.value.trim(),
    recordedBy: existingEvent.value?.recordedBy ?? (userName.value || 'Monet'),
    severity: eventType.value === 'health' ? severity.value : undefined,
    image: image.value,
  }, editId.value);
  setActiveCat(catId.value);
  void router.push(`/events/${saved.id}`);
}
</script>

<template>
  <div class="page add-event-page">
    <AppHeader
      :title="editId ? 'Edit event' : 'Add event'"
      :back-to="existingEvent ? `/events/${existingEvent.id}` : '/dashboard'"
    />
    <div
      v-if="missingEvent"
      class="page-content"
    >
      <div class="empty-state section-card">
        <AppIcon
          name="note"
          :size="32"
        />
        <h2>That event is no longer here</h2>
        <p class="muted">
          It may have been deleted or the demo was refreshed.
        </p>
        <RouterLink
          class="primary-button"
          to="/timeline"
        >
          Back to timeline
        </RouterLink>
      </div>
    </div>
    <form
      v-else
      class="page-content stack event-form"
      novalidate
      @submit.prevent="submit"
    >
      <p class="form-intro muted">
        A little update, a little peace of mind.
      </p>

      <fieldset class="choice-fieldset">
        <legend class="field-label">
          Which cat?
        </legend>
        <div class="cat-options">
          <button
            v-for="cat in cats"
            :key="cat.id"
            class="cat-option"
            :class="{ selected: catId === cat.id }"
            type="button"
            :aria-pressed="catId === cat.id"
            @click="catId = cat.id"
          >
            <CatAvatar
              :cat="cat"
              :size="42"
            />
            <span>{{ cat.name }}</span>
            <AppIcon
              v-if="catId === cat.id"
              class="selection-check"
              name="check"
              :size="13"
            />
          </button>
        </div>
        <p
          v-if="errors.cat"
          class="error-message"
          role="alert"
        >
          {{ errors.cat }}
        </p>
      </fieldset>

      <fieldset class="choice-fieldset">
        <legend class="field-label">
          Event type
        </legend>
        <div class="event-type-options">
          <button
            v-for="type in eventTypes"
            :key="type.value"
            class="type-option"
            :class="{ selected: eventType === type.value }"
            type="button"
            :aria-pressed="eventType === type.value"
            @click="selectType(type.value)"
          >
            <AppIcon
              :name="type.icon"
              :size="23"
            />
            <span>{{ type.label }}</span>
          </button>
        </div>
        <p
          v-if="errors.type"
          class="error-message"
          role="alert"
        >
          {{ errors.type }}
        </p>
      </fieldset>

      <div class="field">
        <label
          class="field-label"
          for="event-date"
        >Date &amp; time <span class="required-label">Required</span></label>
        <input
          id="event-date"
          v-model="date"
          class="form-control"
          type="datetime-local"
          required
          :aria-invalid="Boolean(errors.date)"
          :aria-describedby="errors.date ? 'event-date-error' : undefined"
        >
        <p
          v-if="errors.date"
          id="event-date-error"
          class="error-message"
          role="alert"
        >
          {{ errors.date }}
        </p>
      </div>

      <div class="field">
        <label
          class="field-label"
          for="event-title"
        >Title <span class="required-label">Required</span></label>
        <input
          id="event-title"
          v-model="title"
          class="form-control"
          type="text"
          maxlength="100"
          required
          placeholder="A short description"
          :aria-invalid="Boolean(errors.title)"
          :aria-describedby="errors.title ? 'event-title-error' : undefined"
        >
        <p
          v-if="errors.title"
          id="event-title-error"
          class="error-message"
          role="alert"
        >
          {{ errors.title }}
        </p>
      </div>

      <div
        v-if="eventType === 'health'"
        class="field"
      >
        <label
          class="field-label"
          for="event-severity"
        >Severity</label>
        <select
          id="event-severity"
          v-model="severity"
          class="form-control"
        >
          <option value="mild">
            Mild
          </option>
          <option value="moderate">
            Moderate
          </option>
          <option value="severe">
            Severe
          </option>
        </select>
      </div>

      <div class="field">
        <label
          class="field-label"
          for="event-memo"
        >Memo <span class="optional-label">Optional</span></label>
        <textarea
          id="event-memo"
          v-model="memo"
          class="form-control"
          rows="4"
          maxlength="2000"
          placeholder="How did it go? Add anything you’d like to remember…"
        />
      </div>

      <div class="field">
        <span
          id="photo-label"
          class="field-label"
        >Photo <span class="optional-label">Optional</span></span>
        <div
          v-if="image"
          class="photo-preview"
        >
          <img
            :src="image"
            :alt="imageName || 'Photo attached to this event'"
          >
          <button
            class="secondary-button remove-photo"
            type="button"
            @click="removePhoto"
          >
            <AppIcon
              name="trash"
              :size="16"
            /> Remove photo
          </button>
        </div>
        <label
          v-else
          class="photo-picker"
          for="event-photo"
        >
          <AppIcon
            name="camera"
            :size="26"
          />
          <strong>{{ readingPhoto ? 'Preparing photo…' : 'Add a photo' }}</strong>
          <span class="muted">Choose an image · up to 5 MB</span>
        </label>
        <input
          id="event-photo"
          ref="photoInput"
          class="photo-input"
          type="file"
          accept="image/*"
          aria-labelledby="photo-label"
          :aria-describedby="errors.photo ? 'event-photo-error' : undefined"
          @change="choosePhoto"
        >
        <p
          v-if="errors.photo"
          id="event-photo-error"
          class="error-message"
          role="alert"
        >
          {{ errors.photo }}
        </p>
      </div>

      <button
        class="primary-button save-event"
        type="submit"
        :disabled="readingPhoto"
      >
        <AppIcon
          name="check"
          :size="19"
        /> {{ editId ? 'Save changes' : 'Save event' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-intro { margin: 0 0 2px; font-size: 13px; }
.event-form { gap: 25px; }
.choice-fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
.choice-fieldset legend { margin-bottom: 12px; padding: 0; }
.cat-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.cat-option { position: relative; display: flex; align-items: center; justify-content: center; gap: 7px; min-width: 0; padding: 12px 5px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); color: var(--text); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.cat-option.selected { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 9%, var(--surface)); }
.selection-check { position: absolute; top: 5px; right: 5px; color: var(--primary-dark); }
.event-type-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.type-option { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 80px; padding: 10px 3px; border: 1px solid var(--border); border-radius: 15px; background: var(--surface); color: var(--muted); font: inherit; font-size: 11px; cursor: pointer; }
.type-option.selected { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 11%, var(--surface)); color: var(--primary-dark); }
.optional-label, .required-label { float: right; color: var(--muted); font-size: 11px; font-weight: 400; }
.photo-picker { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 126px; padding: 20px; border: 1px dashed var(--border); border-radius: 18px; background: var(--surface); color: var(--secondary); cursor: pointer; }
.photo-picker strong { font-size: 13px; font-weight: 600; }
.photo-picker span { font-size: 11px; }
.photo-input { width: 100%; margin-top: 8px; color: var(--muted); font: inherit; font-size: 11px; }
.photo-input::file-selector-button { margin-right: 10px; padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font: inherit; cursor: pointer; }
.photo-preview { position: relative; overflow: hidden; border-radius: 18px; background: var(--surface); }
.photo-preview img { display: block; width: 100%; max-height: 250px; object-fit: cover; }
.remove-photo { position: absolute; right: 10px; bottom: 10px; min-height: 36px; font-size: 12px; }
.save-event { width: 100%; margin-top: 2px; }
@media (max-width: 374px) { .cat-option { flex-direction: column; } .event-type-options { gap: 7px; } }
</style>
