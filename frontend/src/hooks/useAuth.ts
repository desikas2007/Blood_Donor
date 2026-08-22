"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole, LoginPayload, RegisterPayload } from "@/types/auth";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getDashboardPath,
} from "@/lib/auth";
import { login as loginService, register as registerService } from "@/services/auth.service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await loginService(payload);
    setCurrentUser(response.user, response.token);
    setUser(response.user);
    router.push(getDashboardPath(response.user.role));
    return response;
  };

  const register = async (payload: RegisterPayload) => {
    const response = await registerService(payload);
    setCurrentUser(response.user, response.token);
    setUser(response.user);
    router.push(getDashboardPath(response.user.role));
    return response;
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
    router.push("/");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    role: user?.role ?? null,
  };
}
