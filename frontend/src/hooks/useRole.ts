"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/types/auth";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

export function useRole(requiredRole?: UserRole) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (requiredRole && currentUser.role !== requiredRole) {
      router.push(getDashboardPath(currentUser.role));
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [requiredRole, router]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    role: user?.role ?? null,
  };
}
