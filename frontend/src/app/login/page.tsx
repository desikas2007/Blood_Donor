import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <LoginForm />
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
