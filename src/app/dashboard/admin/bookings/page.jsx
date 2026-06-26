"use client";

import React, { useEffect, useState } from "react";
import { Table, Chip, Pagination } from "@heroui/react";
import { Bookmark } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/bookings`,
        { cache: "no-store" }
      );

      const json = await res.json();
      setBookings(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const paginated = bookings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10">
          <Bookmark size={40} />
          <p>No bookings found</p>
        </div>
      ) : (
        <>
          {/* ✅ HEROUI PROPER ANATOMY */}
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Admin Bookings Table" className="min-w-[800px]">

                {/* HEADER */}
                <Table.Header>
                  <Table.Column isRowHeader>User Name</Table.Column>
                  <Table.Column>Email</Table.Column>
                  <Table.Column>Phone</Table.Column>
                  <Table.Column>Amount</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>

                {/* BODY */}
                <Table.Body>
                  {paginated.map((b) => (
                    <Table.Row key={b._id}>
                      <Table.Cell>{b.userName}</Table.Cell>
                      <Table.Cell>{b.email}</Table.Cell>
                      <Table.Cell>{b.phone || "-"}</Table.Cell>
                      <Table.Cell>{b.amount}</Table.Cell>

                      <Table.Cell>
                        <Chip
                          color={
                            b.bookingStatus === "confirmed"
                              ? "success"
                              : b.bookingStatus === "pending"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {b.bookingStatus}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

              </Table.Content>
            </Table.ScrollContainer>
          </Table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                color="secondary"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}