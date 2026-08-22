"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserRole } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const roles: { value: UserRole; label: string }[] = [
  { value: "donor", label: "Donor" },
  { value: "hospital", label: "Hospital" },
  { value: "organization", label: "Organization" },
  { value: "public", label: "Public User" },
];

export default function LoginForm() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("donor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegistered, setShowRegistered] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setShowRegistered(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowRegistered(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login({ email, password, role });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Registration success banner */}
      {showRegistered && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-[13px] flex items-center gap-2">
          <span className="text-base">✓</span>
          <span>Account created successfully! Please sign in.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Account Type */}
        <div>
          <label className="block text-[13px] font-medium text-dark mb-1.5">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        {error && (
          <p className="text-[13px] text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>

        <p className="text-center text-[13px] text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-red-600 hover:text-red-700 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
