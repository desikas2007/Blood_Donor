# 🩸 Blood Donor Search & Request Portal

A modern, role-based web application designed to connect **blood donors, hospitals, organizations, and public users** through a centralized platform for blood donor discovery and blood request management.

The platform is designed to make finding suitable blood donors faster, simpler, and more accessible during emergency situations.

---

## 📌 Project Overview

The **Blood Donor Search & Request Portal** provides a centralized platform where:

* **Public Users** can discover blood donor availability and access blood-related services.
* **Donors** can create and manage their donor profile, availability, and respond to requests.
* **Hospitals** can search for suitable donors and send blood requests.
* **Organizations** can search donors, coordinate blood requests, and manage blood-support activities.

### Current Development Phase

> **Frontend Development Phase**

The current implementation focuses entirely on the frontend.

The backend folder already exists in the project repository, but backend development is handled separately.

### Important

**There is NO Admin Dashboard and NO Admin Role in this project.**

The four user-facing areas are:

1. Public User
2. Donor
3. Hospital
4. Organization

---

# 🏗️ System Architecture

The application follows a layered client-server architecture.

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     NEXT.JS APP      │
                         │      FRONTEND        │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
        Public User              Donor               Requesters
                                                    ┌──────┴──────┐
                                                    │             │
                                                    ▼             ▼
                                                Hospital     Organization
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                             Axios / REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     NESTJS API       │
                         │       BACKEND        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       SUPABASE       │
                         │     PostgreSQL DB    │
                         └──────────────────────┘
```

---

# 👥 User Architecture

```text
                    BLOOD DONOR PORTAL
                           │
           ┌───────────────┼────────────────┐
           │               │                │
           ▼               ▼                ▼
       Public User       Donor          Requesters
                                           │
                              ┌────────────┴────────────┐
                              │                         │
                              ▼                         ▼
                          Hospital                 Organization
```

---

# 🔐 Role-Based Access

The application uses role-based navigation and access.

| Role         | Authentication                 | Dashboard              |
| ------------ | ------------------------------ | ---------------------- |
| Public User  | Not required for public access | Public Dashboard       |
| Donor        | Required                       | Donor Dashboard        |
| Hospital     | Required                       | Hospital Dashboard     |
| Organization | Required                       | Organization Dashboard |

There is **no Admin role**.

---

# 🔑 Authentication Flow

The application uses a **common Login and Registration system**.

```text
                         LOGIN
                           │
                           ▼
                     Select Role
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
      Donor             Hospital         Organization
        │                  │                  │
        ▼                  ▼                  ▼
Donor Dashboard    Hospital Dashboard   Organization Dashboard
```

The registration page is also shared.

```text
/register
     │
     ▼
Select Role
     │
 ┌───┼──────────┬───────────┐
 ▼   ▼          ▼           ▼
Public Donor   Hospital   Organization
```

The frontend currently uses **mock authentication** and is structured for future backend authentication integration.

---

# 🖥️ Frontend Architecture

The frontend is developed using **Next.js** with reusable React components.

```text
Frontend
│
├── Pages / Routes
│
├── Components
│
├── Services
│
├── API Layer
│
├── Hooks
│
├── Types
│
└── Mock Data
```

### Main frontend responsibilities

* User interface
* Role-based navigation
* Forms
* Dashboard UI
* Search and filtering
* Request management UI
* Responsive design
* Client-side validation
* Mock data handling
* API integration preparation

---

# 🧩 Main Modules

## 1. Public User

The public section provides access to:

* Homepage
* Blood donor search
* Blood group filtering
* City filtering
* Donor availability
* Blood donation information
* Emergency information

Public users should not see sensitive donor information.

---

## 2. Donor

The donor module provides:

* Donor registration
* Donor profile
* Blood group information
* Location
* Last donation date
* Availability status
* Incoming blood requests
* Accept request
* Reject request
* Profile management

---

## 3. Hospital

The hospital module provides:

* Hospital registration
* Hospital profile
* Donor search
* Blood group filtering
* City filtering
* Donor availability
* Send blood request
* Request tracking
* Request status

---

## 4. Organization

The organization module provides:

* Organization registration
* Organization profile
* Donor search
* Blood group filtering
* City filtering
* Send blood request
* Request tracking
* Blood-support activity information

The Hospital and Organization modules share common requester components wherever possible.

---

# 🛠️ Technology Stack

## Frontend

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| **Next.js**       | Frontend framework            |
| **React**         | UI development                |
| **TypeScript**    | Type-safe development         |
| **Tailwind CSS**  | Styling and responsive design |
| **Axios**         | REST API communication        |
| **Lucide React**  | UI icons                      |
| **Framer Motion** | Subtle UI animations          |

---

## Backend

The backend is planned/developed separately using:

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| **NestJS**   | Backend framework              |
| **Node.js**  | Runtime                        |
| **REST API** | Frontend-backend communication |

---

## Database

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| **Supabase**   | Backend/database platform |
| **PostgreSQL** | Relational database       |

---

# 📁 Project Structure

The repository contains separate frontend and backend folders.

```text
blood-donor-portal/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── register/
│   │   │
│   │   ├── public/
│   │   │   └── dashboard/
│   │   │
│   │   ├── donor/
│   │   │   ├── dashboard/
│   │   │   └── profile/
│   │   │
│   │   ├── hospital/
│   │   │   ├── dashboard/
│   │   │   └── profile/
│   │   │
│   │   └── organization/
│   │       ├── dashboard/
│   │       └── profile/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   ├── donor/
│   │   ├── requester/
│   │   └── public/
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── donor.service.ts
│   │   ├── requester.service.ts
│   │   └── request.service.ts
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useRole.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── donor.ts
│   │   ├── requester.ts
│   │   └── request.ts
│   │
│   ├── data/
│   │   ├── donors.ts
│   │   ├── requests.ts
│   │   └── users.ts
│   │
│   └── public/
│       └── images/
│
└── backend/
    └── Backend implementation
```

---

# 🌐 Main Routes

| Route                     | Purpose                |
| ------------------------- | ---------------------- |
| `/`                       | Main homepage          |
| `/login`                  | Common login           |
| `/register`               | Common registration    |
| `/public/dashboard`       | Public user dashboard  |
| `/donor/dashboard`        | Donor dashboard        |
| `/donor/profile`          | Donor profile          |
| `/hospital/dashboard`     | Hospital dashboard     |
| `/hospital/profile`       | Hospital profile       |
| `/organization/dashboard` | Organization dashboard |
| `/organization/profile`   | Organization profile   |

---

# 🎨 UI / UX Design

The application follows a professional healthcare-oriented visual language.

### Design principles

* Clean
* Minimal
* Professional
* Responsive
* Accessible
* Trustworthy
* Modern

### Primary visual direction

```text
Healthcare + Technology + Community
```

### Primary color

```text
Blood Red
```

Red is used mainly for:

* Primary actions
* Blood-related indicators
* Important notifications
* Emergency sections

Neutral colors are used for the main interface.

---

# 📱 Responsive Design

The frontend must support:

* Mobile
* Tablet
* Laptop
* Desktop

The dashboard layouts should adapt automatically.

### Mobile

```text
Single-column layout
Mobile navigation
Stacked filters
Responsive cards
```

### Desktop

```text
Full navigation
Multi-column grids
Dashboard statistics
Tables
Side-by-side sections
```

---

# 🧪 Frontend Development Phase

The current phase uses **mock data**.

Example:

```typescript
const mockDonors = [
  {
    id: "D001",
    bloodGroup: "O+",
    city: "Salem",
    available: true,
  },
  {
    id: "D002",
    bloodGroup: "A+",
    city: "Erode",
    available: true,
  },
];
```

The UI should be designed so mock services can later be replaced by real REST API calls without rewriting dashboard components.

---

# 🔌 Future API Integration

Planned API structure:

```text
POST   /auth/register
POST   /auth/login
GET    /auth/me

POST   /donors
GET    /donors
GET    /donors/me

POST   /requesters
GET    /requesters/me

POST   /requests
GET    /requests/sent
GET    /requests/received
PATCH  /requests/:id/status
```

The frontend communicates with the backend through Axios.

Example:

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

# 🔒 Security Considerations

The frontend must not expose:

* Database credentials
* Backend secrets
* JWT secrets
* Supabase service-role keys
* Private donor information

Sensitive donor information should only be displayed to authorized users through the backend.

Frontend role checks are for navigation and UX. **Backend authorization must ultimately enforce access control.**

---

# 🚀 Development Workflow

Each team member works on an independent feature branch.

```text
main
│
├── feature/public-dashboard
├── feature/donor-dashboard
├── feature/hospital-dashboard
└── feature/organization-dashboard
```

Example:

```bash
git checkout -b feature/donor-dashboard

git add .

git commit -m "feat: implement donor dashboard"

git push origin feature/donor-dashboard
```

Changes should be merged through Pull Requests.

---

# 👨‍💻 Team Members

## Team Members

### 1. Desika S

**3rd Year — Computer Science and Engineering**

### 2. Arul P

**3rd Year — Computer Science and Engineering**

### 3. Dharani S

**3rd Year — Computer Science and Engineering**

> The project currently has three listed team members. The four functional areas are Public User, Donor, Hospital, and Organization; module ownership can be assigned among the team members as development proceeds.

---

# 📋 Development Responsibilities

The frontend modules can be divided as follows:

| Module       | Responsibility                                 |
| ------------ | ---------------------------------------------- |
| Public User  | Homepage + Public Dashboard                    |
| Donor        | Donor Dashboard + Profile                      |
| Hospital     | Hospital Dashboard + Profile                   |
| Organization | Organization Dashboard + Profile               |
| Shared       | Login, Register, Navbar, Components, API Layer |

Because there are three listed developers and four functional areas, the team can combine **Public User + shared homepage/authentication** under one developer while the other developers own the Donor, Hospital, and Organization modules.

---

# 🎯 Project Objectives

The main objectives are:

1. Create a centralized blood donor discovery platform.
2. Make donor searching faster.
3. Allow hospitals to send blood requests.
4. Allow organizations to coordinate blood requirements.
5. Allow donors to respond to requests.
6. Provide a clean and accessible public interface.
7. Build a scalable frontend architecture.
8. Prepare the frontend for future backend integration.

---

# 🚧 Current Scope

### Included

* Professional homepage
* Common login
* Common registration
* Four role areas
* Donor profile
* Hospital profile
* Organization profile
* Donor search
* Blood group filtering
* City filtering
* Blood request UI
* Request status UI
* Responsive design
* Mock authentication
* Mock data
* API integration layer

### Not Included in Current Frontend Phase

* Admin dashboard
* Real database operations
* Real authentication
* Real SMS
* Real email notifications
* Payment processing
* Backend implementation

---

# 📌 Important Development Rule

**Only the `/frontend` directory should be modified during the current frontend development phase.**

The `/backend` directory must remain untouched unless backend development is explicitly started.

The frontend should be developed with clean abstractions so that the backend can be connected later with minimal changes.

---

# 👥 Team

**Desika S** — 3rd Year CSE
**Arul P** — 3rd Year CSE
**Dharani S** — 3rd Year CSE

---

## ❤️ BloodConnect

> **Every Drop Matters. Every Donor Can Save a Life.**
