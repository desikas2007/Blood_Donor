"use client";

import { DonorProfile } from "@/types/donor";
import { formatDate } from "@/lib/utils";
import Button from "@/components/common/Button";

interface DonorCardProps {
  donor: DonorProfile;
  onRequest?: (donor: DonorProfile) => void;
}

export default function DonorCard({ donor, onRequest }: DonorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{donor.full_name}</h3>
        <span className="bg-primary-100 text-primary-700 text-sm font-bold px-2.5 py-1 rounded-lg hover-scale">
          {donor.blood_group}
        </span>
      </div>

      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
        <p className="flex items-center gap-1.5">
          <span>📍</span>
          <span>{donor.city}, {donor.state}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-200 ${
              donor.available ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span className="text-xs">
            {donor.available ? "Available now" : "Currently unavailable"}
          </span>
        </div>
        {donor.last_donation_date && (
          <p className="text-xs text-gray-400">
            Last donated: {formatDate(donor.last_donation_date)}
          </p>
        )}
      </div>

      {donor.available ? (
        <Button
          variant="primary"
          size="sm"
          className="w-full hover-lift"
          onClick={() => onRequest?.(donor)}
        >
          Send Request
        </Button>
      ) : (
        <div className="text-center text-xs text-gray-400 py-2 border border-dashed border-gray-200 rounded-lg">
          Donor currently unavailable
        </div>
      )}
    </div>
  );
}
