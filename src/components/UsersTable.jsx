"use client";

import { changeUserRole } from "@/lib/actions/users";
import { Table } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UsersTable({ users }) {
const [localUsers, setLocalUsers] = useState(users);
  const handleChange = async (id, role) => {
  const res = await changeUserRole(id, role);

  if (res?.success) {
    toast.success("Role updated");

    // 🔥 IMPORTANT: UI update
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
            {localUsers.map((user) => (
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
  );
}