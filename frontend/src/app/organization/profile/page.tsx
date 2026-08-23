"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { RequesterProfile } from "@/types/requester";
import { getMyRequesterProfile, updateRequesterProfile } from "@/services/requester.service";
import Loading from "@/components/common/Loading";

const TYPE_LABELS: Record<string, string> = {
  ngo: "NGO",
  "blood-bank": "Blood Bank",
  community: "Community Group",
};

export default function OrganizationProfilePage() {
  const { user, loading: authLoading } = useRole("organization");
  const [profile, setProfile] = useState<RequesterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", city: "", state: "", address: "",
  });

  useEffect(() => {
    if (!user) return;
    getMyRequesterProfile()
      .then((p) => {
        setProfile(p);
        setForm({
          name: p.name, phone: p.phone,
          city: p.city, state: p.state, address: p.address,
        });
      })
      .catch(() => setError("Could not load your organization profile. Please re-login."))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError("");
    try {
      const updated = await updateRequesterProfile(profile.id, {
        name: form.name,
        phone: form.phone,
        city: form.city,
        state: form.state,
        address: form.address,
      });
      setProfile(updated);
      setEditing(false);
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return <Loading />;
  if (!profile)
    return (
      <div className="bg-white border border-border rounded-lg p-8 text-center">
        <p className="text-[15px] text-dark font-medium mb-1">Profile unavailable</p>
        <p className="text-[13px] text-muted">{error}</p>
      </div>
    );

  const typeLabel =
    TYPE_LABELS[profile.organization_type || ""] || profile.organization_type || "Organization";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-title text-dark">Organization Profile</h1>
          <p className="text-[15px] text-muted mt-1">Manage your organization information.</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-dark hover:bg-surface transition-colors">
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center text-[18px] font-semibold">
              {(form.name || "O").charAt(0)}
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-dark">{form.name}</h2>
              <p className="text-[13px] text-muted">{typeLabel}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
              { label: "Account", value: user?.email || "" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-[13px] text-muted">{item.label}</span>
                <span className="text-[14px] font-medium text-dark">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="text-card-title text-dark mb-4">Location</h3>
          {editing ? (
            <div className="space-y-3">
              {([
                { key: "name", label: "Organization Name" },
                { key: "phone", label: "Phone" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "address", label: "Address" },
              ] as const).map((field) => (
                <div key={field.key}>
                  <label className="block text-[12px] font-medium text-muted mb-1">{field.label}</label>
                  <input value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
                </div>
              ))}
              {error && <p className="text-[13px] text-red-600">{error}</p>}
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} disabled={saving} className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors disabled:opacity-60">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setEditing(false)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "City", value: profile.city },
                { label: "State", value: profile.state },
                { label: "Address", value: profile.address },
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
