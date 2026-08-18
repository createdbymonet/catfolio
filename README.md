# catfolio

Minimal React + TypeScript + Vite frontend foundation for catfolio, deployed on Cloudflare Workers.

## Stack

- React
- TypeScript
- Vite
- React Router
- SCSS
- Cloudflare Workers with Wrangler
- pnpm

## Local development

1. Install dependencies.
2. Start the Vite development server.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm build
pnpm deploy:development
pnpm deploy:production
```

## Deployment targets

- Development Worker: catfolio-development
- Production Worker: catfolio

Expected URLs:

- Development: https://catfolio-development.sumihana.workers.dev
- Production: https://catfolio.sumihana.workers.dev

## Branch and deployment strategy

- Pull requests run CI via [.github/workflows/ci.yml](.github/workflows/ci.yml).
- Pushes to main run CI and deploy to the development environment via [.github/workflows/deploy-development.yml](.github/workflows/deploy-development.yml).
- Pushes to release deploy to the production environment via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Required GitHub Environment secrets

Create these GitHub Environments and configure the same secrets in each as needed:

- development
- production

Required secrets:

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID

No secret values are committed in this repository.
