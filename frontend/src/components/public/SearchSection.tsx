"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BLOOD_GROUPS } from "@/lib/utils";

export default function SearchSection() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (bloodGroup) params.set("blood_group", bloodGroup);
    if (city) params.set("city", city);
    router.push(`/public/dashboard?${params.toString()}`);
  };

  return (
    <section className="py-12 bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-section-title text-dark mb-2">Find Blood Donors Near You</h2>
        <p className="text-[14px] text-muted mb-6">Search by blood group and city</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="flex-1 h-10 px-3 border border-border rounded-md text-[14px] text-dark bg-white focus:outline-none focus:border-red-500"
          >
            <option value="">Any Blood Group</option>
            {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 h-10 px-3 border border-border rounded-md text-[14px] text-dark placeholder:text-gray-400 focus:outline-none focus:border-red-500"
          />
          <button
            onClick={handleSearch}
            className="h-10 px-6 bg-red-600 text-white rounded-md text-[14px] font-medium hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
