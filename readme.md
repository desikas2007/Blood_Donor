# Codebuff App

Monorepo with a **Next.js** frontend and **Nest.js** backend.

## Project Structure

```
├── frontend/          # Next.js 14 (App Router, TypeScript)
│   ├── src/
│   │   ├── app/       # Pages & layouts (App Router)
│   │   ├── components/# Reusable UI components
│   │   └── lib/       # Utilities & API client
│   └── ...
├── backend/           # Nest.js (TypeScript)
│   ├── src/
│   │   ├── health/    # Sample health-check module
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── ...
└── package.json       # Root scripts (concurrently)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Install Dependencies

```bash
npm run install:all
```

### Run Development Servers

```bash
npm run dev
```

This starts both:
- **Frontend** at `http://localhost:3000`
- **Backend** at `http://localhost:3001`

### Run Tests

```bash
npm run test
```

## API

The backend serves all routes under the `/api` prefix. The frontend proxies `/api/*` requests to the backend via Next.js rewrites.

| Endpoint         | Method | Description      |
| ---------------- | ------ | ---------------- |
| `/api/health`    | GET    | Health check     |

## Adding a New Backend Module

```bash
cd backend
npx nest generate module <name>
```

This creates `src/<name>/` with a module, controller, and service.
