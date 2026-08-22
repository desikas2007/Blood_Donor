"use client";

import { useState } from "react";
import { UserRole } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import RoleSelector from "./RoleSelector";
import { BLOOD_GROUPS, STATES } from "@/lib/utils";

export default function RegisterForm() {
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>("donor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Donor-specific
  const [bloodGroup, setBloodGroup] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");

  // Hospital-specific
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");

  // Organization-specific
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        password,
        confirmPassword,
        role,
        city,
        state,
        blood_group: role === "donor" ? bloodGroup : undefined,
        last_donation_date: role === "donor" ? lastDonationDate : undefined,
        hospital_name: role === "hospital" ? hospitalName : undefined,
        address: role === "hospital" || role === "organization" ? address : undefined,
        organization_name: role === "organization" ? orgName : undefined,
        organization_type: role === "organization" ? orgType : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RoleSelector value={role} onChange={setRole} />

      {/* Common fields */}
      {role === "hospital" ? (
        <Input
          label="Hospital Name"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
          placeholder="City Hospital"
        />
      ) : role === "organization" ? (
        <Input
          label="Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
          placeholder="Red Cross Society"
        />
      ) : (
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="John Doe"
        />
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
      />

      <Input
        label="Phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        placeholder="+91-9876543210"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="Tiruchengode"
        />
        <Select
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          options={stateOptions}
        />
      </div>

      {(role === "hospital" || role === "organization") && (
        <Input
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="123 Main Road"
        />
      )}

      {role === "organization" && (
        <Select
          label="Organization Type"
          value={orgType}
          onChange={(e) => setOrgType(e.target.value)}
          required
          options={[
            { value: "", label: "Select type" },
            { value: "ngo", label: "NGO" },
            { value: "blood-bank", label: "Blood Bank" },
            { value: "community", label: "Community Group" },
          ]}
        />
      )}

      {role === "donor" && (
        <>
          <Select
            label="Blood Group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
            options={bloodGroupOptions}
          />
          <Input
            label="Last Donation Date"
            type="date"
            value={lastDonationDate}
            onChange={(e) => setLastDonationDate(e.target.value)}
          />
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

      <Button type="submit" loading={loading} className="w-full">
        Register
      </Button>
    </form>
  );
}
