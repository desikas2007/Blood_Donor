import { DonorProfile } from "@/types/donor";
import { formatDate } from "@/lib/utils";

interface PublicDonorCardProps {
  donor: DonorProfile;
}

export default function PublicDonorCard({ donor }: PublicDonorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{donor.full_name}</h3>
        <span className="bg-primary-100 text-primary-700 text-sm font-bold px-2.5 py-1 rounded-lg hover-scale">
          {donor.blood_group}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
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
            {donor.available ? "Available to donate" : "Currently unavailable"}
          </span>
        </div>
        {donor.last_donation_date && (
          <p className="text-xs text-gray-400">
            Last updated: {formatDate(donor.last_donation_date)}
          </p>
        )}
      </div>
    </div>
  );
}
