"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import { getCurrentUser } from "@/lib/auth";
import Loading from "@/components/common/Loading";

const STORAGE_KEY = "public_profile";

export default function PublicProfilePage() {
  const { user, loading: authLoading } = useRole("public");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", state: "",
  });

  useEffect(() => {
    if (!user) return;
    // Public users have no backend profile entity — seed from account + keep local edits
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setForm(JSON.parse(stored));
        return;
      } catch {}
    }
    setForm({
      name: getCurrentUser()?.name || "",
      email: getCurrentUser()?.email || "",
      phone: (getCurrentUser() as any)?.phone || "",
      city: "", state: "",
    });
  }, [user]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  if (authLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-title text-dark">Profile</h1>
          <p className="text-[15px] text-muted mt-1">Manage your account information.</p>
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
              {(form.name || "P").charAt(0)}
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-dark">{form.name}</h2>
              <p className="text-[13px] text-muted">Public User</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Email", value: form.email },
              { label: "Phone", value: form.phone },
              { label: "City", value: form.city },
              { label: "State", value: form.state },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-[13px] text-muted">{item.label}</span>
                <span className="text-[14px] font-medium text-dark">{item.value || "-"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="text-card-title text-dark mb-4">Personal Information</h3>
          {editing ? (
            <div className="space-y-3">
              {([
                { key: "name", label: "Full Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
              ] as const).map((field) => (
                <div key={field.key}>
                  <label className="block text-[12px] font-medium text-muted mb-1">{field.label}</label>
                  <input value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors">Save</button>
                <button onClick={() => setEditing(false)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Name", value: form.name },
                { label: "Email", value: form.email },
                { label: "Phone", value: form.phone },
                { label: "City", value: form.city },
                { label: "State", value: form.state },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-[13px] text-muted">{item.label}</span>
                  <span className="text-[14px] font-medium text-dark">{item.value || "-"}</span>
                </div>
              ))}
              {saved && <p className="text-[13px] text-green-600">Profile saved.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
