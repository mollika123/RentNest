"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";

const RejectModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: "",
    feedback: "",
  });

  // reset every time open
  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", feedback: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (loading) return;

    if (!form.title.trim() || !form.feedback.trim()) return;

    onSubmit({
      title: form.title.trim(),
      feedback: form.feedback.trim(),
    });
  };

  // ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* modal card */}
      <div
        className="w-[460px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <h2 className="text-lg font-semibold text-red-600">
            Reject Property
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Provide title and feedback for rejection
          </p>
        </div>

        {/* body */}
        <div className="p-6 space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter rejection title..."
              className="mt-2 w-full rounded-xl border border-gray-200 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Rejection Feedback
            </label>

            <textarea
              name="feedback"
              rows={4}
              value={form.feedback}
              onChange={handleChange}
              placeholder="Write detailed feedback..."
              className="mt-2 w-full rounded-xl border border-gray-200 p-3 text-sm text-black outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
            />
          </div>

          <p className="text-xs text-gray-400">
            Be clear so the owner can improve the listing.
          </p>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-2 px-6 py-4 bg-gray-50 border-t">

          <Button
            size="sm"
            variant="light"
            className="text-gray-600 hover:bg-gray-200"
            onClick={onClose}
            disabled={loading}
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