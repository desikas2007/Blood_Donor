"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/auth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "shadow-md border-b border-gray-100"
          : "shadow-sm border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-scale">
            <span className="text-2xl">🩸</span>
            <span className="text-xl font-bold text-primary-700">
              Blood Donor Portal
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  href={getDashboardPath(user.role)}
                  className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/${user.role}/profile`}
                  className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Profile
                </Link>
                <div className="w-px h-6 bg-gray-200" />
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-all duration-200 hover-lift"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Home
          </Link>
          {isAuthenticated && user ? (
            <>
              <Link
                href={getDashboardPath(user.role)}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                href={`/${user.role}/profile`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Profile
              </Link>
              <div className="border-t border-gray-100 my-2" />
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-white bg-primary-600 hover:bg-primary-700 text-center transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
