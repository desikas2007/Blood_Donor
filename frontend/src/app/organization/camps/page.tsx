"use client";

import { useRole } from "@/hooks/useRole";
import Loading from "@/components/common/Loading";

const mockCamps = [
  { name: "Community Blood Drive", location: "KSR Community Hall", date: "25 Aug 2026", registered: 120, status: "upcoming" },
  { name: "Hospital Blood Camp", location: "City Hospital Campus", date: "20 Aug 2026", registered: 85, status: "completed" },
  { name: "Corporate Blood Drive", location: "TIDCO Office Complex", date: "1 Sep 2026", registered: 0, status: "planned" },
];

export default function BloodCampsPage() {
  const { user, loading: authLoading } = useRole("organization");

  if (authLoading) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Blood Camps</h1>
        <p className="text-[15px] text-muted mt-1">Manage your blood donation campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCamps.map((camp, i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-dark">{camp.name}</h3>
              <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                camp.status === "upcoming" ? "bg-blue-50 text-blue-700" :
                camp.status === "completed" ? "bg-green-50 text-green-700" :
                "bg-gray-100 text-gray-600"
              }`}>
                {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
              </span>
            </div>
            <div className="space-y-1.5 text-[13px] text-muted">
              <p>{camp.location}</p>
              <p>{camp.date}</p>
              <p className="text-dark font-medium">{camp.registered} Donors Registered</p>
            </div>
            <button className="mt-4 w-full h-9 border border-border rounded-md text-[13px] font-medium text-dark hover:bg-surface transition-colors">
              View Campaign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
