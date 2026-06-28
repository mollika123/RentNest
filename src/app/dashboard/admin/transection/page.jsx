// app/dashboard/admin/transactions/page.jsx

import React from "react";
import {
  Table,
  Pagination,
  Chip,
} from "@heroui/react";

const ITEMS_PER_PAGE = 10;

// ✅ SERVER SIDE FETCH
async function getTransactions() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function AdminTransactions({ searchParams }) {
const resolvedSearchParams = await searchParams;
  
  // 3. Extract the page property safely from the resolved object
  const page = Number(resolvedSearchParams?.page || 1);

  const transactions = await getTransactions();

  const paginated = transactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full">

      <h1 className="text-2xl font-bold mb-4">
        Transactions
      </h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Transactions Table">

            <Table.Header>
              <Table.Column isRowHeader>Transaction ID</Table.Column>
              <Table.Column>Property</Table.Column>
              <Table.Column>Tenant</Table.Column>
              <Table.Column>Owner</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Date</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginated.map((t) => (
                <Table.Row key={t.transactionId}>
                  <Table.Cell className="font-mono text-xs">
                    {t.transactionId}
                  </Table.Cell>

                  <Table.Cell>{t.propertyName}</Table.Cell>
                  <Table.Cell>{t.tenantName}</Table.Cell>
                  <Table.Cell>{t.ownerName}</Table.Cell>

                  <Table.Cell>
                    <Chip color="success">
                      {t.amount}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(t.date).toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* Pagination (server style via query param) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}`}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}