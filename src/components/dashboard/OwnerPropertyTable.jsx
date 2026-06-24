"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";
import { Eye, Pencil, Trash, Video } from "lucide-react";

const statusColorMap = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
};
export default function OwnerPropertyTable({ properties = [] }) {

                console.log("properties",properties);
  
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
                 

                    

                      <button className="p-1 hover:opacity-70">
                        <Pencil size={18} color="green"/>
                      </button>

                      <button className="p-1 hover:text-red-500">
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