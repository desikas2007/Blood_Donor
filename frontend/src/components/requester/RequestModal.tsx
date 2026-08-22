"use client";

import { useState } from "react";
import { DonorProfile } from "@/types/donor";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  donor: DonorProfile | null;
  onSend: (message: string) => void;
}

export default function RequestModal({
  isOpen,
  onClose,
  donor,
  onSend,
}: RequestModalProps) {
  const [message, setMessage] = useState("");

  if (!donor) return null;

  const handleSend = () => {
    onSend(message);
    setMessage("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Request Blood from ${donor.full_name}`}
    >
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <p>
            🩸 <span className="font-medium">{donor.blood_group}</span> donor
          </p>
          <p className="text-gray-600">
            📍 {donor.city}, {donor.state}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Describe your blood requirement..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend}>Send Request</Button>
        </div>
      </div>
    </Modal>
  );
}
