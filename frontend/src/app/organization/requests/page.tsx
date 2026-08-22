"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { getSentRequests } from "@/services/request.service";
import Loading from "@/components/common/Loading";

export default function OrganizationRequestsPage() {
  const { user, loading: authLoading } = useRole("organization");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      getSentRequests("u11")
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
        <p className="text-[15px] text-muted mt-1">Track your blood requests.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "pending", "accepted", "rejected", "completed"].map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)} className={`h-8 px-3 rounded-md text-[13px] font-medium transition-colors ${filter === tab ? "bg-red-600 text-white" : "bg-white border border-border text-muted hover:text-dark"}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== "all" && <span className="ml-1 opacity-70">({requests.filter((r) => r.status === tab).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-[15px] text-dark font-medium mb-1">No requests found</p>
          <p className="text-[13px] text-muted">{filter === "all" ? "No requests sent yet." : `No ${filter} requests.`}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-dark">{req.donor_name}</h3>
                  <p className="text-[13px] text-muted">{req.donor_city}</p>
                </div>
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${req.status === "pending" ? "bg-yellow-50 text-yellow-700" : req.status === "accepted" ? "bg-green-50 text-green-700" : req.status === "rejected" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              <p className="text-[13px] text-muted mt-2">{req.donor_blood_group} &middot; {req.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
