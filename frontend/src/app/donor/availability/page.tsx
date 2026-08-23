"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { DonorProfile } from "@/types/donor";
import { getMyDonorProfile, updateDonorProfile } from "@/services/donor.service";
import Loading from "@/components/common/Loading";

export default function AvailabilityPage() {
  const { user, loading: authLoading } = useRole("donor");
  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyDonorProfile()
        .then((d) => setDonor(d))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const toggleAvailability = async () => {
    if (!donor) return;
    const updated = await updateDonorProfile(donor.id, { available: !donor.available });
    setDonor(updated);
  };

  if (authLoading || loading) return <Loading />;
  if (!donor) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Availability</h1>
        <p className="text-[15px] text-muted mt-1">Control whether you receive blood requests.</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-6 max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-card-title text-dark mb-1">Current Status</h2>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${donor.available ? "bg-red-600" : "bg-gray-300"}`} />
              <span className={`text-[15px] font-medium ${donor.available ? "text-red-600" : "text-muted"}`}>
                {donor.available ? "AVAILABLE" : "UNAVAILABLE"}
              </span>
            </div>
          </div>
          <button
            onClick={toggleAvailability}
            className={`h-10 px-5 rounded-md text-[14px] font-medium transition-colors ${
              donor.available
                ? "border border-border text-dark hover:bg-surface"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {donor.available ? "Set Unavailable" : "Set Available"}
          </button>
        </div>
        <p className="text-[14px] text-muted border-t border-border pt-4">
          {donor.available
            ? "You are currently visible to hospitals and organizations searching for donors."
            : "You are hidden from search results. You won't receive new blood requests."}
        </p>
      </div>
    </div>
  );
}
