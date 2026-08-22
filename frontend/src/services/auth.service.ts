import { api } from "@/lib/api";
import {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "@/types/auth";
import { dummyUsers } from "@/data/users";

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  // Frontend-only phase: return dummy data
  const user = dummyUsers.find(
    (u) => u.email === payload.email && u.role === payload.role
  );
  if (user) {
    return { user, token: "dummy-token-" + user.id };
  }
  throw new Error("Invalid credentials");

  // When backend is ready, uncomment below:
  // const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  // return data;
}

export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  // Frontend-only phase: simulate registration
  const newUser = {
    id: "u" + Date.now(),
    email: payload.email,
    role: payload.role,
    created_at: new Date().toISOString(),
  };
  return { user: newUser, token: "dummy-token-" + newUser.id };

  // When backend is ready:
  // const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
  // return data;
}

export async function logout(): Promise<void> {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
