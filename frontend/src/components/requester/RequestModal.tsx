"use client";

import { useState } from "react";
import { DonorProfile } from "@/types/donor";
import { UrgencyLevel } from "@/types/request";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  donor: DonorProfile | null;
  onSend: (message: string, urgency: UrgencyLevel, units: number) => void;
}

export default function RequestModal({
  isOpen,
  onClose,
  donor,
  onSend,
}: RequestModalProps) {
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("normal");
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!donor) return null;

  const urgencyOptions = [
    { value: "normal", label: "Normal" },
    { value: "urgent", label: "Urgent" },
    { value: "critical", label: "Critical" },
  ];

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSend(message, urgency, units);
    setMessage("");
    setUrgency("normal");
    setUnits(1);
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Request Blood from ${donor.full_name}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Donor info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{donor.full_name}</p>
              <p className="text-sm text-gray-500">
                📍 {donor.city}, {donor.state}
              </p>
            </div>
            <span className="bg-primary-100 text-primary-700 text-lg font-bold px-3 py-1 rounded-lg">
              {donor.blood_group}
            </span>
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group Required
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium">
            {donor.blood_group}
          </div>
        </div>

        {/* Required Units */}
        <Input
          label="Required Units"
          type="number"
          min={1}
          max={5}
          value={units}
          onChange={(e) => setUnits(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
        />

        {/* Urgency */}
        <Select
          label="Urgency Level"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
          options={urgencyOptions}
        />

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Describe your blood requirement, patient condition, and any other relevant details..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {!message.trim() && (
            <p className="text-xs text-gray-400 mt-1">Please provide details about your requirement</p>
          )}
        </div>

        {/* Urgency warning */}
        {urgency === "critical" && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Critical requests are prioritized and sent immediately to the donor.
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            loading={loading}
            disabled={!message.trim()}
          >
            Send Request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
