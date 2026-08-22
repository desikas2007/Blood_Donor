import { BloodRequest } from "@/types/request";
import { formatDateTime, getStatusColor } from "@/lib/utils";

interface SentRequestCardProps {
  request: BloodRequest;
}

export default function SentRequestCard({ request }: SentRequestCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">
            {request.donor_name}
          </h3>
          <p className="text-xs text-gray-500">
            {request.donor_blood_group} • {request.donor_city}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>

      {request.message && (
        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-2">
          &quot;{request.message}&quot;
        </p>
      )}

      <p className="text-xs text-gray-400">
        Sent {formatDateTime(request.created_at)}
      </p>
    </div>
  );
}
