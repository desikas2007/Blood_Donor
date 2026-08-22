"use client";

import { Suspense } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🩸</span>
            </div>
            <h1 className="text-page-title text-dark">Welcome Back</h1>
            <p className="text-[14px] text-muted mt-1">Sign in to your account</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
