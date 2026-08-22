"use client";

import { useState } from "react";
import { useRole } from "@/hooks/useRole";
import Loading from "@/components/common/Loading";

export default function OrganizationProfilePage() {
  const { user, loading } = useRole("organization");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Red Cross Society",
    email: "redcross@example.com",
    phone: "+91-9876543221",
    city: "Tiruchengode",
    state: "Tamil Nadu",
    address: "456 NGO Road, Tiruchengode",
    type: "NGO",
  });

  if (loading) return <Loading />;

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
              {form.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-dark">{form.name}</h2>
              <p className="text-[13px] text-muted">{form.type}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Email", value: form.email },
              { label: "Phone", value: form.phone },
              { label: "Type", value: form.type },
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
              {[
                { key: "name", label: "Organization Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "city", label: "City" },
                { key: "address", label: "Address" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[12px] font-medium text-muted mb-1">{field.label}</label>
                  <input value={(form as Record<string, string>)[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full h-9 px-3 border border-border rounded-md text-[14px] text-dark focus:outline-none focus:border-red-500" />
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button onClick={() => setEditing(false)} className="h-9 px-4 bg-red-600 text-white rounded-md text-[13px] font-medium hover:bg-red-700 transition-colors">Save</button>
                <button onClick={() => setEditing(false)} className="h-9 px-4 border border-border rounded-md text-[13px] font-medium text-muted hover:bg-surface transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "City", value: form.city },
                { label: "State", value: form.state },
                { label: "Address", value: form.address },
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
