"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { getReceivedRequests, updateRequestStatus } from "@/services/request.service";
import Loading from "@/components/common/Loading";

export default function DonorRequestsPage() {
  const { user, loading: authLoading } = useRole("donor");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (user) {
      getReceivedRequests()
        .then((data) => setRequests(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleAccept = async (id: string) => {
    try {
      const updated = await updateRequestStatus(id, "accepted");
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {}
  };

  const handleReject = async (id: string) => {
    try {
      const updated = await updateRequestStatus(id, "rejected");
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {}
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  if (authLoading || loading) return <Loading />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">Blood Requests</h1>
        <p className="text-[15px] text-muted mt-1">View and respond to incoming blood requests.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "accepted", "rejected", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`h-8 px-3 rounded-md text-[13px] font-medium transition-colors ${
              filter === tab
                ? "bg-red-600 text-white"
                : "bg-white border border-border text-muted hover:text-dark"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab !== "all" && (
              <span className="ml-1 opacity-70">({requests.filter((r) => r.status === tab).length})</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-[15px] text-dark font-medium mb-1">No requests found</p>
          <p className="text-[13px] text-muted">
            {filter === "all" ? "No blood requests yet." : `No ${filter} requests.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-dark">{req.requester_name}</h3>
                  <p className="text-[13px] text-muted capitalize">{req.requester_type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-red-600">{req.blood_group}</span>
                  <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                    req.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                    req.status === "accepted" ? "bg-green-50 text-green-700" :
                    req.status === "rejected" ? "bg-red-50 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-[13px] text-muted mt-2">{req.donor_city} &middot; Urgency: {req.urgency || "normal"}</p>
              {req.message && (
                <p className="mt-2 text-[14px] text-dark bg-surface px-3 py-2 rounded-md">&ldquo;{req.message}&rdquo;</p>
              )}
              {req.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleReject(req.id)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors">
                    Reject
                  </button>
                  <button onClick={() => handleAccept(req.id)} className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors">
                    Accept
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
