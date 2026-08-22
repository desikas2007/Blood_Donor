"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DonorProfile } from "@/types/donor";
import { searchDonors } from "@/services/donor.service";
import PublicDonorCard from "@/components/public/PublicDonorCard";
import Loading from "@/components/common/Loading";

export default function PublicDashboardPage() {
  const searchParams = useSearchParams();
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bloodGroup = searchParams.get("blood_group") || "";
    const city = searchParams.get("city") || "";

    setLoading(true);
    searchDonors({ blood_group: bloodGroup, city }).then((data) => {
      setDonors(data);
      setLoading(false);
    });
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        🔍 Find Blood Donors
      </h1>

      {loading ? (
        <Loading message="Searching donors..." />
      ) : donors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No donors found matching your criteria.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Found {donors.length} donor(s)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <PublicDonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
