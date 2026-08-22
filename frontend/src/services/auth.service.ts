import { StoredUser, LoginPayload, RegisterPayload, AuthResponse, UserRole } from "@/types/auth";

const USERS_KEY = "blood_portal_users";
const SESSION_KEY = "blood_portal_session";

// ─── Storage helpers ───────────────────────────────────────────────

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ─── Seed demo accounts (only if store is empty) ───────────────────

function seedDemoUsers() {
  const existing = getStoredUsers();
  if (existing.length > 0) return;

  const demoUsers: StoredUser[] = [
    {
      id: "u1",
      name: "Arjun Kumar",
      email: "arjun@example.com",
      password: "Password123",
      role: "donor",
      created_at: "2026-01-10T00:00:00Z",
    },
    {
      id: "u2",
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "Password123",
      role: "donor",
      created_at: "2026-01-12T00:00:00Z",
    },
    {
      id: "u3",
      name: "Vikram Singh",
      email: "vikram@example.com",
      password: "Password123",
      role: "donor",
      created_at: "2026-02-01T00:00:00Z",
    },
    {
      id: "u10",
      name: "City Hospital",
      email: "cityhospital@example.com",
      password: "Password123",
      role: "hospital",
      created_at: "2026-01-05T00:00:00Z",
    },
    {
      id: "u11",
      name: "Red Cross Society",
      email: "redcross@example.com",
      password: "Password123",
      role: "organization",
      created_at: "2026-01-08T00:00:00Z",
    },
    {
      id: "u20",
      name: "Public User",
      email: "public@example.com",
      password: "Password123",
      role: "public",
      created_at: "2026-02-01T00:00:00Z",
    },
  ];

  saveStoredUsers(demoUsers);
}

// Run on import (client side only)
if (typeof window !== "undefined") {
  seedDemoUsers();
}

// ─── Public API ────────────────────────────────────────────────────

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const users = getStoredUsers();
  const normalizedEmail = normalizeEmail(payload.email);

  // Check duplicate email (case-insensitive)
  const existing = users.find((u) => normalizeEmail(u.email) === normalizedEmail);
  if (existing) {
    throw new Error("An account with this email already exists. Please login instead.");
  }

  // Create new user
  const newUser: StoredUser = {
    id: "u" + Date.now(),
    name: payload.name,
    email: normalizedEmail,
    password: payload.password,
    role: payload.role,
    created_at: new Date().toISOString(),
  };

  // Persist
  users.push(newUser);
  saveStoredUsers(users);

  // Return user without password
  const { password: _, ...safeUser } = newUser;
  return { user: safeUser, token: "dummy-token-" + newUser.id };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (!payload.email || !payload.password) {
    throw new Error("Please enter your email and password.");
  }

  const users = getStoredUsers();
  const normalizedEmail = normalizeEmail(payload.email);

  // Find user by email
  const user = users.find((u) => normalizeEmail(u.email) === normalizedEmail);

  if (!user) {
    throw new Error("No account found with this email. Please register first.");
  }

  // Validate role
  if (user.role !== payload.role) {
    const roleLabel =
      user.role === "donor"
        ? "Donor"
        : user.role === "hospital"
        ? "Hospital"
        : user.role === "organization"
        ? "Organization"
        : "Public User";
    throw new Error(
      `This account is registered as a ${roleLabel}. Please select ${roleLabel} to continue.`
    );
  }

  // Validate password
  if (user.password !== payload.password) {
    throw new Error("Incorrect password. Please try again.");
  }

  // Create session (without password)
  const { password: _, ...safeUser } = user;
  const token = "dummy-token-" + user.id;

  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, email: user.email, name: user.name, role: user.role }));

  return { user: safeUser, token };
}

export async function logout(): Promise<void> {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
