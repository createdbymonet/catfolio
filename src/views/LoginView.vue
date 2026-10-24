<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../components/common/AppIcon.vue';
import { useCatfolio } from '../composables/useCatfolio';
const router = useRouter();
const { login } = useCatfolio();
const username = ref('');
const password = ref('');
const error = ref('');
function submit() {
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Enter a username and password to explore Catfolio.';
    return;
  }
  // Demo only: any non-empty credentials work. Passwords are never stored.
  login(username.value.trim());
  void router.push('/dashboard');
}
function viewDemo() {
  login('friend');
  void router.push('/dashboard');
}
</script>

<template>
  <main class="login-page">
    <div class="login-brand">
      <div class="brand-mark">
        <AppIcon
          name="cat"
          :size="39"
        />
      </div><h1>Catfolio<span>.</span></h1><p>Care, health, and memories — together.</p>
    </div>
    <section class="login-card section-card">
      <span class="eyebrow">A LITTLE PLACE FOR THEIR WHOLE LIFE</span>
      <h2>Welcome home.</h2><p class="muted">
        Good care starts with being together.
      </p>
      <form
        class="login-form stack"
        novalidate
        @submit.prevent="submit"
      >
        <div class="field">
          <label
            class="field-label"
            for="username"
          >Username</label><input
            id="username"
            v-model="username"
            class="form-control"
            autocomplete="username"
            placeholder="Your username"
            required
            :aria-invalid="!!error"
            :aria-describedby="error ? 'login-error' : undefined"
          >
        </div>
        <div class="field">
          <label
            class="field-label"
            for="password"
          >Password</label><input
            id="password"
            v-model="password"
            class="form-control"
            type="password"
            autocomplete="current-password"
            placeholder="Your password"
            required
            :aria-invalid="!!error"
            :aria-describedby="error ? 'login-error' : undefined"
          >
        </div>
        <p
          v-if="error"
          id="login-error"
          class="error-message"
          role="alert"
        >
          {{ error }}
        </p>
        <button
          class="primary-button"
          type="submit"
        >
          Log in <AppIcon
            name="chevron-right"
            :size="18"
          />
        </button>
      </form>
      <div class="viewer-note">
        <AppIcon
          name="paw"
          :size="19"
        /><p>
          Just looking around?<br><button
            type="button"
            class="text-button"
            @click="viewDemo"
          >
            Explore with viewer access
          </button>
        </p>
      </div>
    </section>
    <p class="login-footnote">
      A little care. A lot of love.
    </p>
    <p class="prototype-note">
      Frontend demo · Any non-empty credentials work
    </p>
  </main>
</template>

<style scoped lang="scss">
.login-page { min-height: 100svh; padding: 74px 24px 35px; display: flex; flex-direction: column; justify-content: center; }
.login-brand { text-align: center; margin-bottom: 39px; h1 { font-size: 40px; font-weight: 700; letter-spacing: -1.6px; margin: 12px 0 10px; span { color: var(--primary); } } p { font-size: 13px; color: var(--text-muted); margin: 0; } }
.brand-mark { width: 70px; height: 70px; border-radius: 24px; background: var(--primary-soft); color: var(--primary-dark); margin: auto; display: grid; place-items: center; transform: rotate(-5deg); svg { transform: rotate(5deg); } }
.login-card { padding: 28px 23px 23px; h2 { font-size: 25px; margin: 11px 0 7px; letter-spacing: -.7px; } > p { font-size: 13px; margin: 0; } .eyebrow { font-size: 8px; letter-spacing: 1.3px; } }
.login-form { margin-top: 27px; gap: 18px; .primary-button { margin-top: 5px; justify-content: center; gap: 10px; } }
.viewer-note { border-top: 1px solid var(--line); margin-top: 24px; padding-top: 18px; display: flex; justify-content: center; align-items: center; gap: 10px; color: var(--secondary-ink); p { font-size: 11px; line-height: 1.8; margin: 0; } button { font-size: 12px; padding: 0; } }
.login-footnote { text-align: center; font-size: 12px; color: var(--secondary-ink); margin: 29px 0 9px; }
.prototype-note { text-align: center; font-size: 10px; color: var(--text-muted); margin: 0; }
@media (max-height: 750px) { .login-page { padding-top: 35px; } .login-brand { margin-bottom: 25px; } }
</style>
