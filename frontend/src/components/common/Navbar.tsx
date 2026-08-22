"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/auth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🩸</span>
            <span className="text-xl font-bold text-primary-700">
              Blood Donor Portal
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  href={getDashboardPath(user.role)}
                  className="text-sm text-gray-700 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/${user.role}/profile`}
                  className="text-sm text-gray-700 hover:text-primary-600"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
