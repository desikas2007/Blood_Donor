"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

export function useRole(requiredRole?: UserRole) {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (requiredRole && user.role !== requiredRole) {
      router.push(getDashboardPath(user.role));
    }
  }, [user, requiredRole, router]);

  return {
    user,
    isAuthenticated: !!user,
    role: user?.role ?? null,
  };
}
