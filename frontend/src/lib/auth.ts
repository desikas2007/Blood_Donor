import { User, UserRole } from "@/types/auth";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User, token: string) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function clearCurrentUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case "donor":
      return "/donor/dashboard";
    case "hospital":
      return "/hospital/dashboard";
    case "organization":
      return "/organization/dashboard";
    case "public":
    default:
      return "/public/dashboard";
  }
}
