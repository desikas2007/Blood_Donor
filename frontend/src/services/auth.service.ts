import { api, getApiErrorMessage } from "@/lib/api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth";

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  if (!payload.email || !payload.phone) {
    throw new Error("Please enter your email and phone.");
  }
  if ((payload.password || "").length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
  if (payload.password !== payload.confirmPassword) {
    throw new Error("Passwords do not match. Please re-enter them.");
  }

  try {
    // Only send fields the backend accepts (it rejects unknown keys)
    const { data } = await api.post<AuthResponse>("/auth/register", {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
      role: payload.role,
      blood_group: payload.blood_group,
      city: payload.city,
      state: payload.state,
      last_donation_date: payload.last_donation_date,
      hospital_name: payload.hospital_name,
      address: payload.address,
      organization_name: payload.organization_name,
      organization_type: payload.organization_type,
    });
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Registration failed"));
  }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (!payload.email || !payload.password) {
    throw new Error("Please enter your email and password.");
  }

  try {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email: payload.email.trim(),
      password: payload.password,
      role: payload.role,
    });
    return data;
  } catch (error) {
    const err = error as any;
    if (err?.response?.status === 404) {
      throw new Error("Backend not reachable. Is the API running?");
    }
    throw new Error(getApiErrorMessage(error, "Login failed"));
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("blood_portal_session");
}
