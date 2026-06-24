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