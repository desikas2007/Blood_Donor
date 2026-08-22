"use client";

import { useState } from "react";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { BLOOD_GROUPS, STATES } from "@/lib/utils";

interface FilterBarProps {
  onSearch: (bloodGroup: string, city: string, state: string, availability: string) => void;
  onClear?: () => void;
}

export default function FilterBar({ onSearch, onClear }: FilterBarProps) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [availability, setAvailability] = useState("");

  const bloodGroupOptions = [
    { value: "", label: "Any Blood Group" },
    ...BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg })),
  ];

  const stateOptions = [
    { value: "", label: "All States" },
    ...STATES.map((s) => ({ value: s, label: s })),
  ];

  const availabilityOptions = [
    { value: "", label: "All Donors" },
    { value: "available", label: "Available Only" },
    { value: "unavailable", label: "Unavailable" },
  ];

  const handleClear = () => {
    setBloodGroup("");
    setCity("");
    setState("");
    setAvailability("");
    onClear?.();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Search Donors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          options={bloodGroupOptions}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <Select
          value={state}
          onChange={(e) => setState(e.target.value)}
          options={stateOptions}
        />
        <Select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          options={availabilityOptions}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={() => onSearch(bloodGroup, city, state, availability)}>
          Search
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
