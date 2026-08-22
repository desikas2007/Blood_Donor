# Blood Donor Search & Request Portal

Monorepo with a **Next.js** frontend and **Nest.js** backend for connecting blood donors with hospitals and organizations.

## Project Structure

```
blood-donor-portal/
├── frontend/                        # Next.js 14 (App Router + Tailwind)
│   ├── src/
│   │   ├── app/                     # Pages (App Router)
│   │   │   ├── page.tsx             # Public homepage
│   │   │   ├── login/page.tsx       # Common login
│   │   │   ├── register/page.tsx    # Common registration
│   │   │   ├── public/dashboard/    # Public user area
│   │   │   ├── donor/               # Donor dashboard + profile
│   │   │   ├── hospital/            # Hospital dashboard + profile
│   │   │   └── organization/        # Organization dashboard + profile
│   │   ├── components/
│   │   │   ├── common/              # Navbar, Footer, Button, Input, Select, Modal, Loading
│   │   │   ├── auth/                # LoginForm, RegisterForm, RoleSelector
│   │   │   ├── donor/               # DonorProfileCard, IncomingRequestCard
│   │   │   ├── requester/           # DonorCard, FilterBar, RequestModal, SentRequestCard
│   │   │   └── public/              # Hero, SearchSection, PublicDonorCard
│   │   ├── lib/                     # api.ts (Axios), auth.ts, utils.ts
│   │   ├── services/                # auth, donor, requester, request services
│   │   ├── types/                   # auth, donor, requester, request types
│   │   ├── data/                    # Dummy data (donors, requests, users)
│   │   └── hooks/                   # useAuth, useRole
│   └── ...
├── backend/                         # Nest.js 10 (TypeScript)
│   ├── src/
│   │   ├── main.ts                  # Entry point (port 3001)
│   │   ├── app.module.ts            # Root module
│   │   ├── auth/                    # Register, Login (DTOs included)
│   │   ├── donors/                  # Donor CRUD + search
│   │   ├── requesters/              # Hospital/Organization profiles
│   │   └── requests/                # Blood request lifecycle
│   └── ...
└── package.json                     # Root scripts (concurrently)
```

## Roles

| Role | Dashboard | Responsibility |
|------|-----------|----------------|
| Public User | `/public/dashboard` | Browse, search donors (no sensitive data) |
| Donor | `/donor/dashboard` | Manage profile, respond to requests |
| Hospital | `/hospital/dashboard` | Search donors, send/track blood requests |
| Organization | `/organization/dashboard` | Search donors, coordinate requests |

## Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Install & Run

```bash
npm run install:all   # Install dependencies
npm run dev           # Start frontend (3000) + backend (3001)
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login |
| `/api/donors` | GET | Search donors (query: blood_group, city) |
| `/api/donors` | POST | Register as donor |
| `/api/donors/:id` | GET | Get donor profile |
| `/api/donors/:id` | PATCH | Update donor profile |
| `/api/requesters` | POST | Register requester |
| `/api/requesters/:id` | GET | Get requester profile |
| `/api/requests` | POST | Send blood request |
| `/api/requests/sent` | GET | Track sent requests |
| `/api/requests/received` | GET | View incoming requests (donor) |
| `/api/requests/:id/status` | PATCH | Accept/reject request |

## Frontend-Only Phase

During the current phase, all modules use local TypeScript dummy data in `src/data/`. The service layer is already created so switching to NestJS API calls requires uncommenting the `api` calls in each service file — no UI changes needed.

## Integration Rule

All team members must agree on route names, TypeScript interfaces, field names and API response shapes before independent development. This prevents merge conflicts.
