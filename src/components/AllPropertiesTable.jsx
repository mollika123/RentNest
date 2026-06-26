"use client";

import React, { useState } from "react";
import { Table, Button, Pagination } from "@heroui/react";
import RejectModal from "./RejectModal";

const ITEMS_PER_PAGE = 6;

const PropertyTable = ({ properties = [] }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const safeProperties = Array.isArray(properties) ? properties : [];
  const totalPages = Math.ceil(safeProperties.length / ITEMS_PER_PAGE);

  const paginatedProperties = safeProperties.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const openReject = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleApprove = async (id) => {
    try {
      setLoadingId(id);

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Approved" }),
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
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
        { method: "DELETE" }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectSubmit = async (reason) => {
    try {
      setLoading(true);

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${selectedId}/reject`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
  title: "Rejected",
  feedback: reason,
}),
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

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <div className="w-full shadow text-neutral-200 p-6 rounded-lg space-y-6">

      {/* TABLE */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Properties">

            <Table.Header>
              <Table.Column isRowHeader>Property</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedProperties.map((p) => {
                const id = p._id?.$oid || p._id;

                return (
                  <Table.Row key={id}>
                    <Table.Cell>{p.title}</Table.Cell>
                    <Table.Cell>{p.propertyType}</Table.Cell>
                    <Table.Cell>{p.location}</Table.Cell>

                    <Table.Cell>
                      <span className={getStatusColor(p.status)}>
                        {p.status || "Pending"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>{formatDate(p.createdAt)}</Table.Cell>

                    {/* ✅ ACTIONS RESTORED */}
                    <Table.Cell>
                      <div className="flex gap-2 justify-end">

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

      {/* EMPTY STATE */}
      {safeProperties.length === 0 && (
        <p className="text-center text-neutral-500 py-4">
          No properties found.
        </p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination className="justify-center">
            <Pagination.Content>

              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>

            </Pagination.Content>
          </Pagination>
        </div>
      )}

      {/* MODAL */}
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