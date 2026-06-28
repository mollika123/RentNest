import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/admin",
    "/dashboard/admin/users",
    "/dashboard/admin/properties",
    "/dashboard/admin/bookings",
    "/dashboard/admin/transection",

  
    "/properties/:path",

    "/dashboard/owner",
    "/dashboard/owner/properties/new",
    "/dashboard/owner/properties",
    "/dashboard/owner/bookings",

    "/dashboard/tenant",
    "/dashboard/tenant/my-bookings",
    "/dashboard/tenant/favorites",
  ],
};