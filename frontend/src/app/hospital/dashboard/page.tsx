"use client";

import { useState, useEffect, useCallback } from "react";
import { useRole } from "@/hooks/useRole";
import { DonorProfile } from "@/types/donor";
import { BloodRequest } from "@/types/request";
import { UrgencyLevel } from "@/types/request";
import { searchDonors } from "@/services/donor.service";
import { getSentRequests, sendRequest } from "@/services/request.service";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { getGreeting, BLOOD_GROUPS, STATES } from "@/lib/utils";

export default function HospitalDashboardPage() {
  const { user, loading: authLoading } = useRole("hospital");
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<DonorProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("normal");
  const [units, setUnits] = useState(1);

  // Filters
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (user) {
      Promise.all([searchDonors({}), getSentRequests()])
        .then(([d, r]) => {
          setDonors(d);
          setRequests(r);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchDonors({ blood_group: bloodGroup, city });
      let filtered = data;
      if (state) filtered = filtered.filter((d) => d.state === state);
      setDonors(filtered);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [bloodGroup, city, state]);

  const handleSendRequest = async () => {
    if (!selectedDonor || !message.trim()) return;
    try {
      await sendRequest(selectedDonor, selectedDonor.blood_group, message, urgency, units);
      const updated = await getSentRequests();
      setRequests(updated);
      setModalOpen(false);
      setMessage("");
      setUrgency("normal");
      setUnits(1);
    } catch {
      // ignore
    }
  };

  if (authLoading || loading) return <Loading />;

  const activeRequests = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-page-title text-dark">{getGreeting()}</h1>
        <p className="text-[15px] text-muted mt-1">Find the right blood donor quickly.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Requests", value: String(activeRequests) },
          { label: "Accepted", value: String(accepted) },
          { label: "Completed", value: String(completed) },
          { label: "Available Donors", value: String(donors.filter((d) => d.available).length) },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-4">
            <p className="text-[12px] text-muted uppercase tracking-wide mb-1">{stat.label}</p>
            <p className="text-[22px] font-semibold text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white border border-border rounded-lg p-5 mb-8" id="search">
        <h2 className="text-card-title text-dark mb-4">Find Blood Donors</h2>
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
            <Button onClick={handleSearch} className="w-full">Search Donors</Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map((donor) => (
          <div key={donor.id} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-dark">{donor.full_name}</span>
              <span className="text-[13px] font-semibold text-red-600">{donor.blood_group}</span>
            </div>
            <p className="text-[13px] text-muted mb-1">{donor.city}, {donor.state}</p>
            <div className="flex items-center gap-1.5 mb-3">
              <span className={`w-2 h-2 rounded-full ${donor.available ? "bg-red-600" : "bg-gray-300"}`} />
              <span className="text-[12px] text-muted">{donor.available ? "Available" : "Unavailable"}</span>
            </div>
            {donor.available && (
              <button
                onClick={() => { setSelectedDonor(donor); setModalOpen(true); }}
                className="w-full h-9 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors"
              >
                Send Request
              </button>
            )}
          </div>
        ))}
      </div>

      {donors.length === 0 && (
        <div className="bg-white border border-border rounded-lg p-8 text-center mt-4">
          <p className="text-[15px] text-dark font-medium mb-1">No donors found</p>
          <p className="text-[13px] text-muted">Try changing the blood group or location.</p>
        </div>
      )}

      {/* Request Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Send Blood Request">
        {selectedDonor && (
          <div className="space-y-4">
            <div className="bg-surface rounded-md p-3">
              <p className="text-[14px] font-medium text-dark">{selectedDonor.full_name}</p>
              <p className="text-[13px] text-muted">{selectedDonor.blood_group} &middot; {selectedDonor.city}</p>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">Required Units</label>
              <input type="number" min={1} max={5} value={units} onChange={(e) => setUnits(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))} className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">Urgency</label>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value as UrgencyLevel)} className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500">
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-muted mb-1">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Describe your requirement..." className="w-full px-3 py-2 border border-border rounded-md text-[14px] text-dark placeholder:text-gray-400 focus:outline-none focus:border-red-500 resize-none" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSendRequest} disabled={!message.trim()}>Send Request</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
