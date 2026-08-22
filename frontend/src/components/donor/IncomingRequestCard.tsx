"use client";

import { BloodRequest } from "@/types/request";
import { formatDateTime, getStatusColor } from "@/lib/utils";
import Button from "@/components/common/Button";

interface IncomingRequestCardProps {
  request: BloodRequest;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function IncomingRequestCard({
  request,
  onAccept,
  onReject,
}: IncomingRequestCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {request.requester_name}
          </h3>
          <p className="text-xs text-gray-500 capitalize">
            {request.requester_type}
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

      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <p>
          🩸 Blood Group: <span className="font-medium">{request.blood_group}</span>
        </p>
        <p className="text-gray-500">{formatDateTime(request.created_at)}</p>
      </div>

      {request.message && (
        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-3">
          &quot;{request.message}&quot;
        </p>
      )}

      {request.status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAccept?.(request.id)}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onReject?.(request.id)}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
