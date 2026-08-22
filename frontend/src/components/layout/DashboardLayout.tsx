"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/auth";
import { UserRole } from "@/types/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navIcons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  requests: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  history: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  availability: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  profile: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  camps: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  logout: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  ),
};

const roleNav: Record<UserRole, NavItem[]> = {
  donor: [
    { label: "Dashboard", href: "/donor/dashboard", icon: navIcons.dashboard },
    { label: "Requests", href: "/donor/requests", icon: navIcons.requests },
    { label: "Donation History", href: "/donor/donation-history", icon: navIcons.history },
    { label: "Availability", href: "/donor/availability", icon: navIcons.availability },
    { label: "Profile", href: "/donor/profile", icon: navIcons.profile },
  ],
  hospital: [
    { label: "Dashboard", href: "/hospital/dashboard", icon: navIcons.dashboard },
    { label: "Find Donors", href: "/hospital/dashboard#search", icon: navIcons.search },
    { label: "My Requests", href: "/hospital/requests", icon: navIcons.requests },
    { label: "Profile", href: "/hospital/profile", icon: navIcons.profile },
  ],
  organization: [
    { label: "Dashboard", href: "/organization/dashboard", icon: navIcons.dashboard },
    { label: "Find Donors", href: "/organization/dashboard#search", icon: navIcons.search },
    { label: "My Requests", href: "/organization/requests", icon: navIcons.requests },
    { label: "Blood Camps", href: "/organization/camps", icon: navIcons.camps },
    { label: "Profile", href: "/organization/profile", icon: navIcons.profile },
  ],
  public: [
    { label: "Find Blood", href: "/public/dashboard", icon: navIcons.search },
    { label: "Profile", href: "/public/profile", icon: navIcons.profile },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <>{children}</>;

  const nav = roleNav[user.role] || [];
  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === href.split("#")[0];
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:border-r border-border bg-white fixed top-0 left-0 h-full z-30">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
          <span className="text-xl">🩸</span>
          <span className="text-[15px] font-semibold text-dark tracking-tight">BloodConnect</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium transition-colors duration-150 ${
                  active
                    ? "bg-red-50 text-red-600"
                    : "text-muted hover:bg-surface hover:text-dark"
                }`}
              >
                <span className={active ? "text-red-600" : "text-muted"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium text-muted hover:bg-surface hover:text-dark w-full transition-colors duration-150"
          >
            {navIcons.logout}
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🩸</span>
            <span className="text-[15px] font-semibold text-dark">BloodConnect</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="p-1 text-muted hover:text-dark">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="py-4 px-3 space-y-0.5">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium transition-colors duration-150 ${
                  active
                    ? "bg-red-50 text-red-600"
                    : "text-muted hover:bg-surface hover:text-dark"
                }`}
              >
                <span className={active ? "text-red-600" : "text-muted"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={() => { setMobileOpen(false); logout(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium text-muted hover:bg-surface hover:text-dark w-full"
          >
            {navIcons.logout}
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted hover:text-dark"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="flex-1" />

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-medium text-dark leading-tight">{user.email}</p>
              <p className="text-[11px] text-muted">{roleLabel}</p>
            </div>
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-[13px] font-semibold">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
