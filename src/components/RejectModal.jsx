"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";

const RejectModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      {/* modal card */}
      <div className="w-[440px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">

        {/* header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <h2 className="text-lg font-semibold text-red-600">
            Reject Property
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            This action will notify the owner with your feedback
          </p>
        </div>

        {/* body */}
        <div className="p-6">

          <label className="text-sm font-medium text-gray-700">
            Rejection Reason
          </label>

          <textarea
            className="mt-2 w-full rounded-xl border text-black border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
            rows={4}
            placeholder="Write clear reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <p className="text-xs text-gray-400 mt-2">
            Tip: Be specific so the owner can improve the listing.
          </p>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-2 px-6 py-4 bg-gray-50 border-t">

          <Button
            size="sm"
            variant="light"
            className="text-gray-600 hover:bg-gray-200"
            onClick={() => {
              setReason("");
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
            isLoading={loading}
            onClick={handleSubmit}
          >
            Reject
          </Button>

        </div>
      </div>
    </div>
  );
};

export default RejectModal;