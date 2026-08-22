import { DonorProfile } from "@/types/donor";
import { formatDate } from "@/lib/utils";

interface DonorProfileCardProps {
  donor: DonorProfile;
}

export default function DonorProfileCard({ donor }: DonorProfileCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{donor.full_name}</h2>
          <p className="text-sm text-gray-500">{donor.email}</p>
        </div>
        <span className="bg-primary-100 text-primary-700 text-lg font-bold px-3 py-1 rounded-lg">
          {donor.blood_group}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Phone</span>
          <p className="font-medium">{donor.phone}</p>
        </div>
        <div>
          <span className="text-gray-500">City</span>
          <p className="font-medium">{donor.city}</p>
        </div>
        <div>
          <span className="text-gray-500">State</span>
          <p className="font-medium">{donor.state}</p>
        </div>
        <div>
          <span className="text-gray-500">Last Donation</span>
          <p className="font-medium">
            {donor.last_donation_date
              ? formatDate(donor.last_donation_date)
              : "Never donated"}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            donor.available ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <span className="text-sm font-medium text-gray-700">
          {donor.available ? "Available to donate" : "Currently unavailable"}
        </span>
      </div>
    </div>
  );
}
