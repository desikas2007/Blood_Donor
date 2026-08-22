"use client";

import { useRole } from "@/hooks/useRole";
import Loading from "@/components/common/Loading";

export default function OrganizationProfilePage() {
  const { user, loading } = useRole("organization");

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Organization Profile</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Red Cross Society</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Email</span>
            <p className="font-medium">redcross@example.com</p>
          </div>
          <div>
            <span className="text-gray-500">Phone</span>
            <p className="font-medium">+91-9876543221</p>
          </div>
          <div>
            <span className="text-gray-500">City</span>
            <p className="font-medium">Tiruchengode</p>
          </div>
          <div>
            <span className="text-gray-500">State</span>
            <p className="font-medium">Tamil Nadu</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address</span>
            <p className="font-medium">456 NGO Road, Tiruchengode</p>
          </div>
        </div>
      </div>
    </div>
  );
}
