"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth";
import { register as registerService } from "@/services/auth.service";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { BLOOD_GROUPS, STATES } from "@/lib/utils";

const roles: { value: UserRole; label: string }[] = [
  { value: "donor", label: "Donor" },
  { value: "hospital", label: "Hospital" },
  { value: "organization", label: "Organization" },
  { value: "public", label: "Public User" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("donor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalRegNumber, setHospitalRegNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");

  const bloodGroupOptions = [
    { value: "", label: "Select blood group" },
    ...BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg })),
  ];
  const stateOptions = [
    { value: "", label: "Select state" },
    ...STATES.map((s) => ({ value: s, label: s })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (role === "public" && !name) { setError("Full name is required"); return; }
    if (role === "hospital" && !hospitalName) { setError("Hospital name is required"); return; }
    if (role === "organization" && !orgName) { setError("Organization name is required"); return; }
    if (!email) { setError("Email is required"); return; }
    if (!phone) { setError("Phone is required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (role === "donor" && !bloodGroup) { setError("Blood group is required"); return; }
    if (role === "hospital" && !hospitalRegNumber) { setError("Registration number is required"); return; }
    if (role === "organization" && !orgType) { setError("Organization type is required"); return; }

    setLoading(true);
    try {
      await registerService({
        name: role === "hospital" ? hospitalName : role === "organization" ? orgName : name,
        email, phone, password, confirmPassword, role, city, state,
        blood_group: role === "donor" ? bloodGroup : undefined,
        last_donation_date: role === "donor" ? lastDonationDate : undefined,
        hospital_name: role === "hospital" ? hospitalName : undefined,
        address: role !== "public" ? address : undefined,
        organization_name: role === "organization" ? orgName : undefined,
        organization_type: role === "organization" ? orgType : undefined,
      });
      // Redirect to login after brief delay so user sees success
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Account Type */}
      <div>
        <label className="block text-[13px] font-medium text-dark mb-1.5">Account Type</label>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={`px-3 py-2.5 border rounded-md text-[13px] font-medium transition-colors ${
                role === r.value
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-border text-muted hover:border-gray-300"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name field */}
      {role === "hospital" ? (
        <Input label="Hospital Name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required placeholder="City Hospital" />
      ) : role === "organization" ? (
        <Input label="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} required placeholder="Red Cross Society" />
      ) : (
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
      )}

      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
      <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91-9876543210" />

      {role === "hospital" && (
        <Input label="Hospital Registration Number" value={hospitalRegNumber} onChange={(e) => setHospitalRegNumber(e.target.value)} required placeholder="HRN-12345" />
      )}

      {role === "donor" && (
        <Input label="Date of Birth" type="date" value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} />
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="City" />
        <div>
          <label className="block text-[13px] font-medium text-dark mb-1.5">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} required className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
            {stateOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {role === "donor" && (
        <div>
          <label className="block text-[13px] font-medium text-dark mb-1.5">Blood Group</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
            {bloodGroupOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )}

      {(role === "hospital" || role === "organization") && (
        <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="123 Main Road" />
      )}

      {role === "organization" && (
        <div>
          <label className="block text-[13px] font-medium text-dark mb-1.5">Organization Type</label>
          <select value={orgType} onChange={(e) => setOrgType(e.target.value)} required className="w-full h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
            <option value="">Select type</option>
            <option value="ngo">NGO</option>
            <option value="blood-bank">Blood Bank</option>
            <option value="community">Community Group</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters" minLength={6} />
        <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Repeat password" />
      </div>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</p>
      )}

      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-[13px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-red-600 hover:text-red-700 font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}
