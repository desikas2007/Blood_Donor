"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DonorProfile } from "@/types/donor";
import { searchDonors } from "@/services/donor.service";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";
import { BLOOD_GROUPS, STATES } from "@/lib/utils";

function PublicDashboardContent() {
  const searchParams = useSearchParams();
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState(searchParams.get("blood_group") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [state, setState] = useState("");
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchDonors({ blood_group: bloodGroup, city })
      .then((data) => {
        if (cancelled) return;
        let filtered = data;
        if (state) filtered = filtered.filter((d) => d.state === state);
        setDonors(filtered);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [bloodGroup, city, state, searchKey]);

  const handleSearch = useCallback(() => {
    setSearchKey((k) => k + 1);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Find Blood Donors</h1>
        <p className="text-[15px] text-muted mt-1">Search for available donors near your location.</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-border rounded-lg p-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[12px] font-medium text-muted mb-1">Blood Group</label>
            <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500">
              <option value="">Any</option>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted mb-1">City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Any city" className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark placeholder:text-gray-400 focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted mb-1">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500">
              <option value="">Any</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full">Search</Button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading message="Searching donors..." />
      ) : donors.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-[15px] text-dark font-medium mb-1">No donors found</p>
          <p className="text-[13px] text-muted">Try changing the blood group or location.</p>
        </div>
      ) : (
        <>
          <p className="text-[14px] text-muted mb-4">
            Found <span className="font-medium text-dark">{donors.length}</span> donor(s)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div key={donor.id} className="bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] font-semibold text-dark">{donor.full_name}</span>
                  <span className="text-[13px] font-semibold text-red-600">{donor.blood_group}</span>
                </div>
                <p className="text-[13px] text-muted mb-1">{donor.city}, {donor.state}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${donor.available ? "bg-red-600" : "bg-gray-300"}`} />
                  <span className="text-[12px] text-muted">{donor.available ? "Available" : "Unavailable"}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PublicDashboardPage() {
  return (
    <Suspense fallback={<Loading message="Loading..." />}>
      <PublicDashboardContent />
    </Suspense>
  );
}
