"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { DonorProfile } from "@/types/donor";
import { getDonorProfile, updateDonorProfile } from "@/services/donor.service";
import Loading from "@/components/common/Loading";
import { BLOOD_GROUPS, STATES, formatDate } from "@/lib/utils";

export default function DonorProfilePage() {
  const { user, loading: authLoading } = useRole("donor");
  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", state: "", bloodGroup: "", lastDonation: "" });

  useEffect(() => {
    if (user) {
      getDonorProfile("d1")
        .then((d) => {
          setDonor(d);
          setForm({
            name: d.full_name, phone: d.phone, city: d.city, state: d.state,
            bloodGroup: d.blood_group, lastDonation: d.last_donation_date || "",
          });
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSave = async () => {
    if (!donor) return;
    setSaving(true);
    const updated = await updateDonorProfile(donor.id, {
      full_name: form.name, phone: form.phone, city: form.city, state: form.state,
      blood_group: form.bloodGroup, last_donation_date: form.lastDonation || null,
    });
    setDonor(updated);
    setEditing(false);
    setSaving(false);
  };

  if (authLoading || loading) return <Loading />;
  if (!donor) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-title text-dark">Profile</h1>
          <p className="text-[15px] text-muted mt-1">Manage your personal information.</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-dark hover:bg-surface transition-colors">
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — summary */}
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center text-[18px] font-semibold">
              {donor.full_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-dark">{donor.full_name}</h2>
              <p className="text-[13px] text-muted">{donor.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-50 text-red-600 text-[14px] font-semibold px-3 py-1 rounded-md">{donor.blood_group}</span>
            <span className={`flex items-center gap-1.5 text-[13px] font-medium ${donor.available ? "text-red-600" : "text-muted"}`}>
              <span className={`w-2 h-2 rounded-full ${donor.available ? "bg-red-600" : "bg-gray-300"}`} />
              {donor.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Right — details */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="text-card-title text-dark mb-4">Personal Information</h3>
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-muted mb-1">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-muted mb-1">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-muted mb-1">City</label>
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-muted mb-1">State</label>
                  <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500">
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} disabled={saving} className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors disabled:opacity-50">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setEditing(false)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Phone", value: donor.phone },
                { label: "City", value: donor.city },
                { label: "State", value: donor.state },
                { label: "Last Donation", value: donor.last_donation_date ? formatDate(donor.last_donation_date) : "Never" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-[13px] text-muted">{item.label}</span>
                  <span className="text-[14px] font-medium text-dark">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
