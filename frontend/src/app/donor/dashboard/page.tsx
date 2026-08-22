"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { BloodRequest } from "@/types/request";
import { getReceivedRequests, updateRequestStatus } from "@/services/request.service";
import DonorProfileCard from "@/components/donor/DonorProfileCard";
import IncomingRequestCard from "@/components/donor/IncomingRequestCard";
import Loading from "@/components/common/Loading";
import { dummyDonors } from "@/data/donors";

export default function DonorDashboardPage() {
  const { user, loading: authLoading } = useRole("donor");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const donorProfile = dummyDonors[0]; // Dummy: first donor

  useEffect(() => {
    if (user) {
      getReceivedRequests(user.id).then((data) => {
        setRequests(data);
        setLoading(false);
      });
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Donor Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DonorProfileCard donor={donorProfile} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Incoming Requests
          </h2>
          {requests.length === 0 ? (
            <p className="text-gray-500">No incoming requests yet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <IncomingRequestCard
                  key={req.id}
                  request={req}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
