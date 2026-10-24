# catfolio

A shared cat health and care management web application built with Vue 3, TypeScript, and Cloudflare.

`catfolio` is designed for managing our cats together as a household while also serving as a portfolio project that demonstrates authentication, role-based access control, health-record management, and full-stack web application development.

The application is currently in its initial infrastructure phase.

## Current status

The current version provides the initial application and deployment foundation.

Available now:

- Vue 3 + TypeScript + Vite application
- Cloudflare Workers deployment
- Separate development and production environments
- GitHub Actions CI
- Automated development and production deployment
- Minimal `Coming Soon` page

## Planned roles

The application is planned to support three access levels:

- **Owner** — primary administrator with full application and user-management permissions
- **Approved Admin** — a user authorized by the owner who can manage cat records
- **Viewer** — read-only access intended primarily for portfolio demonstration and recruiters

## Planned features

Future versions are planned to include:

- Cat profiles
- Health records
- Weight tracking
- Feeding and care records
- Medication records
- Vaccination and preventive-care records
- Veterinary visit history
- Photo and document storage
- Shared household management
- Role-based access control
- Read-only portfolio/demo access

## Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- Vue Router
- SCSS

### Runtime / Infrastructure

- Cloudflare Workers
- Wrangler

### Development / Delivery

- pnpm
- GitHub Actions

Additional infrastructure such as Cloudflare D1 and Cloudflare R2 will be introduced in later versions as application features require them.

## Local development

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Start the Vite development server:

```bash
pnpm dev
```

Validate the application and create the production build in `dist/`:

```bash
pnpm type-check
pnpm lint
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Frontend structure

```text
src/
  router/
    index.ts
  styles/
    main.scss
  views/
    ComingSoonView.vue
  App.vue
  main.ts
  vite-env.d.ts
```

`main.ts` creates the Vue application, registers Vue Router, and loads the existing global SCSS. `App.vue` renders the router view, and `router/index.ts` maps `/` to the Coming Soon page. Vue components use the Composition API with `<script setup lang="ts">` when scripting is needed.

## Deployment

Cloudflare Workers serves the Vite build from `dist/`, with single-page application fallback for client-side routing. The existing Worker and Wrangler environment configuration are shared by both deployment targets.

Manual deployment commands build the application before deploying:

```bash
pnpm deploy:development
pnpm deploy:production
```

`pnpm deploy` builds and deploys using the default Wrangler configuration (`catfolio`, the same Worker name as production).

GitHub Actions installs dependencies with the frozen pnpm lockfile and builds before deploying:

- Pushes to `main` deploy to the `development` environment and the `catfolio-development` Worker.
- Pushes to `release` deploy to the `production` environment and the `catfolio` Worker.
- Pull requests and pushes to `main` run CI lint and build checks; the build includes type-checking.

Deployment workflows use the existing `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub secrets.
