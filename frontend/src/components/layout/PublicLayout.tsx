"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/auth";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="h-16 border-b border-border bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl">🩸</span>
            <span className="text-[15px] font-semibold text-dark">BloodConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Link href={getDashboardPath(user.role)} className="text-[14px] text-muted hover:text-dark transition-colors">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-[14px] text-red-600 hover:text-red-700 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[14px] text-muted hover:text-dark transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-[14px] font-medium hover:bg-red-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">🩸</span>
                <span className="text-[15px] font-semibold text-dark">BloodConnect</span>
              </div>
              <p className="text-[14px] text-muted leading-relaxed">
                Connecting donors, hospitals and organizations through one trusted blood-support platform.
              </p>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-dark mb-3">Quick Links</h3>
              <ul className="space-y-2 text-[14px] text-muted">
                <li><Link href="/" className="hover:text-dark transition-colors">Home</Link></li>
                <li><Link href="/public/dashboard" className="hover:text-dark transition-colors">Find Blood</Link></li>
                <li><Link href="/register" className="hover:text-dark transition-colors">Become a Donor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-dark mb-3">Contact</h3>
              <ul className="space-y-2 text-[14px] text-muted">
                <li>support@bloodconnect.org</li>
                <li>+91-1800-BLOOD-HELP</li>
                <li className="text-red-600 font-medium">Emergency: 108</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-[13px] text-muted">
            &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
