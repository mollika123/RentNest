"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import RejectModal from "./RejectModal";
import { EditModal } from "./EditModal";

const PropertyTable = ({ properties }) => {
  const [loadingId, setLoadingId] = useState(null);

  // ✅ modal states
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔴 open reject modal
  const openReject = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // 🟢 APPROVE
  const handleApprove = async (id) => {
    try {
      setLoadingId(id);

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Approved",
          }),
        }
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Property deleted successfully");
      window.location.reload(); // or remove from state
    } else {
      alert("Delete failed");
    }
  } catch (error) {
    console.log(error);
  }
};
  // 🔴 REJECT SUBMIT
  const handleRejectSubmit = async (reason) => {
    try {
      setLoading(true);

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${selectedId}/reject`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejectionReason: reason }),
        }
      );

      setOpen(false);
      setSelectedId(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 STATUS UI
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-emerald-500";
      case "rejected":
        return "text-rose-500";
      default:
        return "text-amber-500";
    }
  };

  // 📅 DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full shadow text-neutral-200 p-6 rounded-lg">
      <Table className="bg-transparent border-none">
        <Table.ScrollContainer>
          <Table.Content aria-label="Property table">
            <Table.Header>
              <Table.Column isRowHeader>Property</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {properties?.map((p) => {
                const id = p._id?.$oid || p._id;

                return (
                  <Table.Row key={id}>
                    <Table.Cell className="font-medium">
                      {p.title}
                    </Table.Cell>

                    <Table.Cell className="text-neutral-400">
                      {p.propertyType}
                    </Table.Cell>

                    <Table.Cell className="text-neutral-400">
                      {p.location}
                    </Table.Cell>

                    <Table.Cell>
                      <span className={getStatusColor(p.status)}>
                        {p.status || "Pending"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="text-neutral-400">
                      {formatDate(p.createdAt)}
                    </Table.Cell>

                    <Table.Cell className="text-right">
                      <div className="flex justify-end gap-2">

                        {/* APPROVE */}
                        {p.status !== "Approved" && (
                          <Button
                            size="sm"
                            disabled={loadingId === id}
                            className="bg-emerald-950/30 text-emerald-500"
                            onClick={() => handleApprove(id)}
                          >
                            {loadingId === id ? "..." : "Approve"}
                          </Button>
                        )}

                        {/* REJECT */}
                        {p.status !== "Rejected" && (
                          <Button
                            size="sm"
                            className="bg-rose-950/30 text-rose-500"
                            onClick={() => openReject(id)}
                          >
                            Reject
                          </Button>

                         
                        )}
                    
                           <button
      onClick={() => handleDelete(id)}
      className="text-red-500 hover:scale-110 transition"
      title="Delete"
    >
      🗑️
    </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* 🔥 MODAL (OUTSIDE MAP - IMPORTANT) */}
      <RejectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleRejectSubmit}
        loading={loading}
      />
    </div>
  );
};

export default PropertyTable;