import { serverFetch } from "../core/server"

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
export const getProperties = async () => {
  return serverFetch('/api/properties')
}

export const getPropertyById = async (propertyId) => {
  return serverFetch(`/api/properties/${propertyId}`)
}
export const getProperty = async (userId,status) => {
  const res = await fetch(`${baseUrl}/api/properties?userId=${userId}&status=${status}`)
  return res.json()
}


