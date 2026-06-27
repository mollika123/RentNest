import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TenantHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const name = session?.user?.name || "Guest";

  return (
    <div className="text-2xl font-bold">
      <h1>Hi {name}</h1>
      <DashboardStats></DashboardStats>
    </div>
  );
}