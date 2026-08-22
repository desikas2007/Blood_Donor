import { User } from "@/types/auth";

export const dummyUsers: User[] = [
  {
    id: "u1",
    email: "arjun@example.com",
    role: "donor",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "u2",
    email: "priya@example.com",
    role: "donor",
    created_at: "2026-01-12T00:00:00Z",
  },
  {
    id: "u10",
    email: "cityhospital@example.com",
    role: "hospital",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "u11",
    email: "redcross@example.com",
    role: "organization",
    created_at: "2026-01-08T00:00:00Z",
  },
  {
    id: "u20",
    email: "public@example.com",
    role: "public",
    created_at: "2026-02-01T00:00:00Z",
  },
];
