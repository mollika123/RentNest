"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";
import { Eye, Pencil, Trash, Video } from "lucide-react";
import { EditModal } from "../EditModal";
import { redirect, useRouter } from "next/navigation";


const statusColorMap = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
};
export default function OwnerPropertyTable({ properties = [] }) {
 const router = useRouter();
  console.log("properties", properties);
 
  const handleRemove = async (id) => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    });
console.log("Response status:", res.status);
    const data = await res.json();
    if (data.deletedCount > 0) {
      router.refresh(); // data refetch করবে
      // অথবা router.push('/dashboard/owner/properties');
    }
  };
  
  return (
    <div className="w-full">
      <Table>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Properties Table"
            className="min-w-[800px]"
          >
            {/* HEADER */}
            <Table.Header>
              <Table.Column id="title" isRowHeader defaultWidth="1fr" minWidth={160}>
                Title
              </Table.Column>

              <Table.Column id="location" defaultWidth="1fr" minWidth={140}>
                Location
              </Table.Column>

              <Table.Column id="rent" defaultWidth="1fr" minWidth={140}>
                Monthly Rent
              </Table.Column>

              <Table.Column id="type" defaultWidth="1fr" minWidth={140}>
                Type
              </Table.Column>

              <Table.Column id="status" defaultWidth="1fr" minWidth={120}>
                Status
              </Table.Column>

              <Table.Column id="actions" defaultWidth="1fr" minWidth={160}>
                Actions
              </Table.Column>
            </Table.Header>

            {/* BODY */}
            <Table.Body>
              {properties.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell className="font-medium">
                    {item.title}
                  </Table.Cell>

                  <Table.Cell>{item.location}</Table.Cell>

                  <Table.Cell> {item.monthlyRent}</Table.Cell>

                  <Table.Cell>{item.propertyType} </Table.Cell>

                  <Table.Cell>
                   <Chip
  size="sm"
  variant="soft"
  color={statusColorMap[item.status] ?? "warning"}
>
  {item.status}
</Chip>
                  </Table.Cell>

                  {/* ACTIONS */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                 

                    <EditModal property={item}></EditModal>

                     
                    <button 
   onClick={() => handleRemove(item._id)}
  className="p-1 hover:text-red-500 transition-colors"
  title="Delete Property"
>
  <Trash size={18} color="red" />
</button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
}