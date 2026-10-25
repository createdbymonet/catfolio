# Catfolio

A mobile-first app for keeping your cats' daily care, health records, and memories together.

**[Demo](https://catfolio.sumihana.workers.dev/dashboard)**

## Features

- Track care tasks and create, edit, or delete events.
- Browse timelines and favorite memories by cat.
- Edit cat profiles and preview photos locally.

This frontend prototype uses in-memory mock data. Changes reset on refresh; authentication, persistent storage, and household sharing are not implemented.

## Stack

Vue 3 · TypeScript · Vite · Vue Router · SCSS · Cloudflare Workers

## Development

Use Node.js 22 and pnpm 10.15.1.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Validate and build:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Run `pnpm preview` to preview the production build.

## Deployment

```bash
pnpm deploy
```

This builds and deploys to Cloudflare Workers. Pushes to `release` deploy automatically; `main` runs CI checks only.

## Design

[Catfolio in Figma](https://www.figma.com/design/Q9OfBVQjro4pomhkRogs24/Catfolio?node-id=4-6)

## License

[MIT](./LICENSE)
