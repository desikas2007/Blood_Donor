import { User } from "@/types/auth";

/**
 * Legacy dummy users kept for reference.
 * The mock auth system now stores registered users in localStorage
 * under the key "blood_portal_users".
 */
export const dummyUsers: User[] = [
  {
    id: "u1",
    name: "Arjun Kumar",
    email: "arjun@example.com",
    role: "donor",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "donor",
    created_at: "2026-01-12T00:00:00Z",
  },
  {
    id: "u3",
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "donor",
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "u10",
    name: "City Hospital",
    email: "cityhospital@example.com",
    role: "hospital",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "u11",
    name: "Red Cross Society",
    email: "redcross@example.com",
    role: "organization",
    created_at: "2026-01-08T00:00:00Z",
  },
  {
    id: "u20",
    name: "Public User",
    email: "public@example.com",
    role: "public",
    created_at: "2026-02-01T00:00:00Z",
  },
];
