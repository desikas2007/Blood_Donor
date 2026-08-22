"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { DonorProfile } from "@/types/donor";
import { BloodRequest } from "@/types/request";
import { searchDonors } from "@/services/donor.service";
import { getSentRequests, sendRequest } from "@/services/request.service";
import FilterBar from "@/components/requester/FilterBar";
import DonorCard from "@/components/requester/DonorCard";
import RequestModal from "@/components/requester/RequestModal";
import SentRequestCard from "@/components/requester/SentRequestCard";
import Loading from "@/components/common/Loading";

export default function HospitalDashboardPage() {
  const { user, loading: authLoading } = useRole("hospital");
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<DonorProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        searchDonors({}),
        getSentRequests(user.id),
      ]).then(([donorData, requestData]) => {
        setDonors(donorData);
        setRequests(requestData);
        setLoading(false);
      });
    }
  }, [user]);

  const handleSearch = async (bloodGroup: string, city: string) => {
    setLoading(true);
    const data = await searchDonors({ blood_group: bloodGroup, city });
    setDonors(data);
    setLoading(false);
  };

  const handleSendRequest = async (message: string) => {
    if (selectedDonor) {
      await sendRequest(selectedDonor.id, selectedDonor.blood_group, message);
      const updated = await getSentRequests(user!.id);
      setRequests(updated);
    }
  };

  if (authLoading || loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Hospital Dashboard
      </h1>

      <FilterBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donor Search Results */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Available Donors ({donors.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <DonorCard
                key={donor.id}
                donor={donor}
                onRequest={(d) => {
                  setSelectedDonor(d);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Sent Requests */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sent Requests
          </h2>
          {requests.length === 0 ? (
            <p className="text-gray-500">No requests sent yet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <SentRequestCard key={req.id} request={req} />
              ))}
            </div>
          )}
        </div>
      </div>

      <RequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        donor={selectedDonor}
        onSend={handleSendRequest}
      />
    </div>
  );
}
