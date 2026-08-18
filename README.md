# catfolio

A shared cat health and care management web application built with React, TypeScript, and Cloudflare.

`catfolio` is designed for managing our cats together as a household while also serving as a portfolio project that demonstrates authentication, role-based access control, health-record management, and full-stack web application development.

The application is currently in its initial infrastructure phase.

## Current status

The current version provides the initial application and deployment foundation.

Available now:

- React + TypeScript + Vite application
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

- React
- TypeScript
- Vite
- React Router
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