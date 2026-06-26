"use client";

import { changeUserRole } from "@/lib/actions/users";
import { Table, Pagination } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export default function UsersTable({ users }) {
  const [localUsers, setLocalUsers] = useState(users);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(localUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = localUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleChange = async (id, role) => {
    const res = await changeUserRole(id, role);

    if (res?.success) {
      toast.success("Role updated");

      setLocalUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );
    } else {
      toast.error(res?.message || "Failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* TABLE */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Users Table">

            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedUsers.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className="capitalize">
                    {user.role}
                  </Table.Cell>
                  <Table.Cell>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleChange(user._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="tenant">Tenant</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* EMPTY STATE */}
      {localUsers.length === 0 && (
        <p className="text-center text-neutral-500 py-4">
          No users found.
        </p>
      )}

      {/* PAGINATION (HeroUI compound API) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

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

    </div>
  );
}