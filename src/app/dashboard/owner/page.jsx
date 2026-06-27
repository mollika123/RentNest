import { Card } from "@heroui/react";
import {
  House,
  CircleDollar,
  Bookmark,
} from "@gravity-ui/icons";
import OwnerChart from "@/components/OwnerChart";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function OwnerOverview({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  console.log(email);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/owner/analyse/${email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load dashboard
      </div>
    );
  }

  const data = await res.json();

  const stats = [
    {
      title: "Total Earnings",
      value: `৳${(data.totalEarnings || 0).toLocaleString()}`,
      icon: <CircleDollar size={28} />,
    },
    {
      title: "Total Properties",
      value: data.totalProperties || 0,
      icon: <House size={28} />,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings || 0,
      icon: <Bookmark size={28} />,
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">
          Owner Overview
        </h1>
        <p className="text-slate-400 text-sm">
          Analytics dashboard for your properties & earnings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="bg-slate-950 border border-slate-800 p-6 flex flex-row justify-between items-center hover:border-purple-500 transition"
          >
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                {item.title}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                {item.value}
              </h2>
            </div>

            <div className="text-purple-400">
              {item.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
        <h2 className="text-white font-bold mb-4">
          Monthly Earnings
        </h2>

        <OwnerChart data={data.chart || []} />
      </div>
    </div>
  );
}