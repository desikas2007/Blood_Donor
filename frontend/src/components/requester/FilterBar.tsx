"use client";

import { useState } from "react";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { BLOOD_GROUPS } from "@/lib/utils";

interface FilterBarProps {
  onSearch: (bloodGroup: string, city: string) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const bloodGroupOptions = [
    { value: "", label: "Any Blood Group" },
    ...BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg })),
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Search Donors</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            options={bloodGroupOptions}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button onClick={() => onSearch(bloodGroup, city)}>Search</Button>
      </div>
    </div>
  );
}
