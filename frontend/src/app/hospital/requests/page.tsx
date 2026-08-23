"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { getSentRequests } from "@/services/request.service";
import Loading from "@/components/common/Loading";

export default function HospitalRequestsPage() {
  const { user, loading: authLoading } = useRole("hospital");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      getSentRequests()
        .then((data) => setRequests(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  if (authLoading || loading) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">My Requests</h1>
        <p className="text-[15px] text-muted mt-1">Track your blood requests and their status.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "pending", "accepted", "rejected", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`h-8 px-3 rounded-md text-[13px] font-medium transition-colors ${
              filter === tab ? "bg-red-600 text-white" : "bg-white border border-border text-muted hover:text-dark"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== "all" && <span className="ml-1 opacity-70">({requests.filter((r) => r.status === tab).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-[15px] text-dark font-medium mb-1">No requests found</p>
          <p className="text-[13px] text-muted">
            {filter === "all" ? "No blood requests sent yet." : `No ${filter} requests.`}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase">Donor</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase">Blood Group</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase">Date</th>
                  <th className="text-left px-5 py-3 text-[12px] font-medium text-muted uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => (
                  <tr key={req.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-[14px] text-dark">{req.donor_name}</td>
                    <td className="px-5 py-4"><span className="text-[13px] font-semibold text-red-600">{req.donor_blood_group}</span></td>
                    <td className="px-5 py-4 text-[14px] text-muted">{new Date(req.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                        req.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                        req.status === "accepted" ? "bg-green-50 text-green-700" :
                        req.status === "rejected" ? "bg-red-50 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((req) => (
              <div key={req.id} className="bg-white border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-dark">{req.donor_name}</span>
                  <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                    req.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                    req.status === "accepted" ? "bg-green-50 text-green-700" :
                    req.status === "rejected" ? "bg-red-50 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
                <p className="text-[13px] text-muted">{req.donor_blood_group} &middot; {req.donor_city}</p>
                <p className="text-[12px] text-muted mt-1">{new Date(req.created_at).toLocaleDateString("en-IN")}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
