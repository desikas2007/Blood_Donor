"use client";

import { DonorProfile } from "@/types/donor";
import Button from "@/components/common/Button";

interface DonorCardProps {
  donor: DonorProfile;
  onRequest?: (donor: DonorProfile) => void;
}

export default function DonorCard({ donor, onRequest }: DonorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{donor.full_name}</h3>
        <span className="bg-primary-100 text-primary-700 text-sm font-bold px-2 py-1 rounded">
          {donor.blood_group}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <p>📍 {donor.city}, {donor.state}</p>
        <div className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${
              donor.available ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span className="text-xs">
            {donor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {donor.available && (
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onRequest?.(donor)}
        >
          Send Request
        </Button>
      )}
    </div>
  );
}
