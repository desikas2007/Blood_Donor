"use client";

import { BloodRequest } from "@/types/request";
import { formatDateTime, getStatusColor, getUrgencyColor } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";

interface SentRequestCardProps {
  request: BloodRequest;
}

export default function SentRequestCard({ request }: SentRequestCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <Avatar name={request.donor_name} size="sm" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {request.donor_name}
            </h3>
            <p className="text-xs text-gray-500">
              {request.donor_blood_group} • {request.donor_city}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(
            request.status
          )}`}
        >
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {request.urgency && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded transition-colors duration-200 ${getUrgencyColor(
              request.urgency
            )}`}
          >
            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
          </span>
        )}
        {request.required_units && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {request.required_units} unit{request.required_units > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {request.message && (
        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-2 line-clamp-2">
          &quot;{request.message}&quot;
        </p>
      )}

      <p className="text-xs text-gray-400">
        Sent {formatDateTime(request.created_at)}
      </p>
    </div>
  );
}
