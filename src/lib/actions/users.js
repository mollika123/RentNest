"use server";

export async function changeUserRole(id, role) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/role`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    const data = await res.json();

    return data; // 👈 VERY IMPORTANT
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}