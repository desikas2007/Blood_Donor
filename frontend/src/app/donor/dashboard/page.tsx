"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { DonorProfile } from "@/types/donor";
import { getReceivedRequests, updateRequestStatus } from "@/services/request.service";
import { getDonorProfile } from "@/services/donor.service";
import Loading from "@/components/common/Loading";
import { getGreeting } from "@/lib/utils";

export default function DonorDashboardPage() {
  const { user, loading: authLoading } = useRole("donor");
  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([getDonorProfile("d1"), getReceivedRequests("d1")])
        .then(([d, r]) => {
          setDonor(d);
          setRequests(r);
        })
        .catch(() => {})  
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleAccept = async (id: string) => {
    const updated = await updateRequestStatus(id, "accepted");
    setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const handleReject = async (id: string) => {
    const updated = await updateRequestStatus(id, "rejected");
    setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  if (authLoading || loading) return <Loading />;
  if (!donor) return <Loading />;

  const stats = [
    { label: "Blood Group", value: donor.blood_group },
    { label: "Total Donations", value: "12" },
    { label: "Requests Received", value: String(requests.length) },
    { label: "Accepted", value: String(requests.filter((r) => r.status === "accepted").length) },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-page-title text-dark">
          {getGreeting()}, {donor.full_name.split(" ")[0]}
        </h1>
        <p className="text-[15px] text-muted mt-1">
          Manage your availability and respond to blood requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-4">
            <p className="text-[12px] text-muted uppercase tracking-wide mb-1">{stat.label}</p>
            <p className="text-[22px] font-semibold text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Availability */}
      <div className="bg-white border border-border rounded-lg p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-card-title text-dark mb-1">Availability</h2>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${donor.available ? "bg-red-600" : "bg-gray-300"}`} />
              <span className={`text-[14px] font-medium ${donor.available ? "text-red-600" : "text-muted"}`}>
                {donor.available ? "AVAILABLE" : "UNAVAILABLE"}
              </span>
            </div>
            <p className="text-[13px] text-muted mt-1">
              {donor.available
                ? "You are currently available to receive blood requests."
                : "You are not accepting blood requests."}
            </p>
          </div>
          <button className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-dark hover:bg-surface transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Recent Requests */}
      <div>
        <h2 className="text-card-title text-dark mb-4">Recent Requests</h2>
        {requests.length === 0 ? (
          <div className="bg-white border border-border rounded-lg p-8 text-center">
            <p className="text-[15px] text-dark font-medium mb-1">No blood requests yet</p>
            <p className="text-[13px] text-muted">
              You&apos;ll see incoming requests here when hospitals or organizations need your blood group.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-white border border-border rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-dark">{req.requester_name}</h3>
                    <p className="text-[13px] text-muted capitalize">{req.requester_type}</p>
                  </div>
                  <span className="text-[13px] font-medium text-red-600">{req.blood_group}</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-[13px] text-muted">
                  <span>{req.donor_city}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="capitalize">Urgency: {req.urgency || "normal"}</span>
                </div>
                {req.message && (
                  <p className="mt-3 text-[14px] text-dark bg-surface px-3 py-2 rounded-md">
                    &ldquo;{req.message}&rdquo;
                  </p>
                )}
                {req.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleReject(req.id)}
                      className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors"
                    >
                      Accept
                    </button>
                  </div>
                )}
                {req.status !== "pending" && (
                  <div className="mt-3">
                    <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${
                      req.status === "accepted" ? "bg-green-50 text-green-700" :
                      req.status === "rejected" ? "bg-red-50 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
