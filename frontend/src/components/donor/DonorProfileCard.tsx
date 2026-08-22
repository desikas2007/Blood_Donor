import { DonorProfile } from "@/types/donor";
import { formatDate } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";

interface DonorProfileCardProps {
  donor: DonorProfile;
}

export default function DonorProfileCard({ donor }: DonorProfileCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <Avatar name={donor.full_name} size="lg" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{donor.full_name}</h2>
          <p className="text-sm text-gray-500">{donor.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-primary-100 text-primary-700 text-sm font-bold px-2.5 py-1 rounded-lg">
              {donor.blood_group}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                donor.available
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  donor.available ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              {donor.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Phone</span>
          <p className="font-medium mt-0.5">{donor.phone}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">City</span>
          <p className="font-medium mt-0.5">{donor.city}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">State</span>
          <p className="font-medium mt-0.5">{donor.state}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Last Donation</span>
          <p className="font-medium mt-0.5">
            {donor.last_donation_date
              ? formatDate(donor.last_donation_date)
              : "Never donated"}
          </p>
        </div>
      </div>
    </div>
  );
}
