import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-1">Join the blood donor community</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <RegisterForm />
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
