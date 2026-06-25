'use server'

import { headers } from "next/headers"

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
export const createProperty = async (newPropertyData) => {
 
  const res = await fetch(`${baseUrl}/api/properties`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newPropertyData)
  })
  return res.json()
}

export const updateProperty = async (id, updatedPropertyData) => {
  try {
    const res = await fetch(`${baseUrl}/api/properties/${id}`, {
      method: 'PATCH', // এক্সপ্রেস ব্যাকএন্ডের PATCH রুটের সাথে মিল রেখে
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPropertyData)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to update property")
    }

    const data = await res.json()

    // এটি আপনার টেবিল বা ড্যাশবোর্ড পেজের ক্যাশ ক্লিয়ার করবে, 
    // যাতে মডাল ক্লোজ হওয়ার সাথে সাথে নতুন ডাটা টেবিলে দেখা যায়।
   revalidatePath("/dashboard/owner/properties")// আপনার ড্যাশবোর্ডের সঠিক পাথটি দিন

    return { success: true, data }
  } catch (error) {
    console.error("Server Action Error:", error.message)
    return { success: false, error: error.message }
  }
}