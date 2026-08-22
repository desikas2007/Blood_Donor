"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import { BLOOD_GROUPS } from "@/lib/utils";

export default function SearchSection() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const bloodGroupOptions = [
    { value: "", label: "Any Blood Group" },
    ...BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg })),
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (bloodGroup) params.set("blood_group", bloodGroup);
    if (city) params.set("city", city);
    router.push(`/public/dashboard?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Find Blood Donors Near You
        </h2>
        <p className="text-gray-600 mb-8">
          Search by blood group and city to find available donors
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
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
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
    </section>
  );
}
