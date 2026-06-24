import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })

     if (!session) return null;

  return {
    id: session.userId,   // 🔥 KEY FIX
    ...session.user
  };
}

export const requireRole = async (role) => {
    const user = await getUserSession()
    if (!user) {
        redirect('/signin')
    }
    if (user.role !== role) {
      return  redirect('/unauthorized')
    }
    return user
}