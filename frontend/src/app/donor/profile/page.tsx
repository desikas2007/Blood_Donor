"use client";

import { useRole } from "@/hooks/useRole";
import DonorProfileCard from "@/components/donor/DonorProfileCard";
import Loading from "@/components/common/Loading";
import { dummyDonors } from "@/data/donors";

export default function DonorProfilePage() {
  const { user, loading } = useRole("donor");

  if (loading) return <Loading />;

  const donorProfile = dummyDonors[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <DonorProfileCard donor={donorProfile} />
    </div>
  );
}
