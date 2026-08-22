"use client";

import { UserRole } from "@/types/auth";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string; icon: string }[] = [
  { value: "public", label: "Public User", icon: "👤" },
  { value: "donor", label: "Donor", icon: "🩸" },
  { value: "hospital", label: "Hospital", icon: "🏥" },
  { value: "organization", label: "Organization", icon: "🏢" },
];

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        I am a
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`flex flex-col items-center p-3 border rounded-lg text-sm transition-all
              ${
                value === role.value
                  ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
          >
            <span className="text-xl mb-1">{role.icon}</span>
            <span className="text-xs font-medium">{role.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
