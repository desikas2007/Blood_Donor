"use client";

import { BloodRequest } from "@/types/request";
import { formatDateTime, getStatusColor, getUrgencyColor } from "@/lib/utils";
import Button from "@/components/common/Button";
import Avatar from "@/components/common/Avatar";

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
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={request.requester_name} size="md" />
          <div>
            <h3 className="font-semibold text-gray-900">
              {request.requester_name}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {request.requester_type}
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

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-sm bg-primary-50 text-primary-700 px-2.5 py-1 rounded-lg font-medium">
          🩸 {request.blood_group}
        </span>
        {request.urgency && (
          <span
            className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg transition-colors duration-200 ${getUrgencyColor(
              request.urgency
            )}`}
          >
            {request.urgency === "critical"
              ? "🔴"
              : request.urgency === "urgent"
              ? "🟠"
              : "🟢"}{" "}
            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
          </span>
        )}
        {request.required_units && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
            {request.required_units} unit{request.required_units > 1 ? "s" : ""} needed
          </span>
        )}
      </div>

      {request.message && (
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-3 leading-relaxed">
          &quot;{request.message}&quot;
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {formatDateTime(request.created_at)}
        </p>
        {request.status === "pending" && (
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAccept?.(request.id)}
              className="hover-lift"
            >
              Accept
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onReject?.(request.id)}
              className="hover-lift"
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
