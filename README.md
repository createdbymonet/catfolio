# Catfolio

Catfolio is a warm, mobile-first place to keep a cat's care, health records, and memories together. The current version is a functional frontend prototype with local mock data for Sumi, Hana, and Mugi. Future versions are intended to support shared household care.

Authentication, database persistence, household sharing, and real-time synchronization are not implemented yet.

## Current prototype

All eight screens are implemented, with a centered app shell on larger displays:

| Screen | Route |
| --- | --- |
| Login | `/login` |
| Dashboard | `/dashboard` |
| Cat Profile | `/cats/:id` |
| Add Event | `/events/new` |
| Timeline | `/timeline` |
| Event Detail | `/events/:id` |
| Memories | `/memories` |
| Memory Detail | `/memories/:id` |

The root route `/` redirects to `/dashboard`. Unknown paths also return to the dashboard; missing event, cat, or memory IDs display a helpful empty state. The reusable bottom navigation links to Home, Timeline, Add, Memories, and the active cat's profile.

Available interactions include:

- Select a cat and mark that cat's care tasks complete.
- Open Add Event with a care type preselected from Quick Add.
- Create or edit an event with a cat, type, local date/time, memo, and optional local photo preview.
- Filter the timeline, open records, and delete events.
- Filter memories by cat or favorites, toggle hearts, and edit memory titles and memos.
- Edit a cat's name, weight, and next checkup in the profile.

### Demo login

Any non-empty username and password opens the dashboard. The username becomes the greeting's display name; the password is never stored or sent anywhere. **Explore with viewer access** also opens the demo without credentials. Viewer access uses the same local prototype interactions and does not enforce a read-only role. Routes remain directly accessible because there is no real authentication or permission system.

### Local data and dates

All changes exist only in shared Vue reactive state for the current page session. Refreshing the page restores the seed records, care tasks, favorites, and display name. There are no backend requests, database writes, localStorage records, or cloud uploads.

Memory events also appear in Memories. Linked title and memo edits stay in sync; deleting the event or changing its type removes its gallery entry. Without a photo, a local illustration is used.

The seeded timeline represents **October 24, 2026**, with records from that day and October 23. Its Today/Yesterday labels use that fixed demo date. Form date/time values use the browser's local time; they are not converted into a server timezone. Photo selection previews a file locally and does not persist it after a refresh.

Cat and memory imagery uses local illustrative SVG placeholders in `public/images/`, so the UI has no remote image dependency. The palette is centralized in `src/styles/main.scss`.

## Stack

- Vue 3 with the Composition API and `<script setup lang="ts">`
- TypeScript
- Vite
- Vue Router with history routing
- SCSS and the existing system font stack
- pnpm
- Cloudflare Workers and Wrangler
- GitHub Actions

The React-to-Vue migration was already complete before this frontend phase. This implementation uses the existing stack and adds no dependencies or state-management library.

## Local development

Use pnpm 10.15.1 and a supported Node.js version; CI uses Node.js 22.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

On the implementation machine, an unrelated ancestor pnpm workspace was detected. If the same condition makes installation target the wrong workspace, run this optional local workaround from the Catfolio repository:

```bash
pnpm install --ignore-workspace --frozen-lockfile
```

Validate and build:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm type-check` is the original spelling and remains available; `pnpm typecheck` is its alias. The build also runs type-checking before Vite creates `dist/`. No separate formatting command is configured; Vue template conventions are checked by ESLint.

Preview the production build:

```bash
pnpm preview
```

For a manual frontend check, open each route at 375px, 390px, 440px, and desktop widths. Check the care buttons, event creation/editing/deletion, timeline filters, favorites, cat selection, navigation, keyboard focus, and browser console. Refreshing should reset the demo data.

## Frontend structure

```text
public/
  images/                  Local cat and memory SVG placeholders
src/
  components/
    common/                Shared icons, avatars, headers, and filter controls
    cards/                 Shared care, event, and memory presentation
    navigation/            Reusable bottom navigation
  composables/
    useCatfolio.ts         Shared in-memory state and local mutations
  mocks/
    index.ts               Typed seed cats, events, memories, and care tasks
  router/
    index.ts               Screen routes, redirects, titles, and scroll behavior
  styles/
    main.scss              Palette, app shell, typography, and shared controls
  types/
    index.ts               Cat, CatEvent, Memory, CareTask, and event types
  utils/
    date.ts                Local date/time formatting and demo date labels
  views/                   The eight screen components
  App.vue                  Shared app shell and router outlet
  main.ts                  Application, router, and SCSS entry point
```

`useCatfolio()` exposes reactive records and the active cat to the views. Its methods update only the local arrays. Mock data stays outside the screen components, and no Pinia store is needed for this phase.

## Design reference

The reference is [Catfolio in Figma](https://www.figma.com/design/Q9OfBVQjro4pomhkRogs24/Catfolio?node-id=4-6). The Figma connector was blocked by its usage quota during implementation, so the actual screen renders could not be inspected or precisely compared. The frontend follows the supplied screen specification, mobile proportions, color palette, and interaction requirements. The local SVG illustrations are intentional placeholders and are not exported Figma assets. A comparison against the accessible Figma screens remains the next visual review step.

## Deployment

Cloudflare Workers serves the Vite build from `dist/` through the production Worker `catfolio`. The top-level Wrangler configuration retains the Worker entry point, compatibility date, `ASSETS` binding, and single-page application fallback for direct route loads. Production is the only Cloudflare deployment target.

The sole manual deployment command builds before deploying to `catfolio`:

```bash
pnpm deploy
```

- `main` is the normal development/source branch. Pushes and merges to `main` run CI checks and do not deploy to Cloudflare.
- Pushes to `release` build the Vue application and deploy `catfolio`, using the GitHub `production` environment.
- Pull requests and pushes to `main` retain CI lint and build checks, including type-checking.

The production workflow retains the existing `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub secrets. The unused GitHub `development` environment can be removed manually from repository settings after reviewing any stored secrets or protection rules; repository cleanup does not delete remote environments or Workers.

Local development remains `pnpm dev` through Vite on localhost and does not require a Cloudflare deployment.

## Future backend work

Before backend development, compare all eight screens with the Figma reference and agree on the event fields, cat profile fields, validation rules, and owner/admin/viewer behavior. Review the prototype flows with real household care examples before turning the local models into API and database contracts.

Later phases may add real authentication, database persistence, household membership and permissions, durable photo storage, invitations, synchronization, and notifications. Cloudflare D1 and R2 remain possible future infrastructure choices; neither is connected in this prototype. Real production accounts and multi-user functionality are outside the current implementation.

## License

Catfolio is licensed under the [MIT License](./LICENSE).
