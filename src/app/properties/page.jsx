import React from "react";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";




export const getProperties = async (filters) => {
  try {
    const query = new URLSearchParams();
    
    if (filters?.location) query.set("location", filters.location);
    if (filters?.propertyType) query.set("propertyType", filters.propertyType);
    if (filters?.maxPrice) query.set("maxPrice", filters.maxPrice);
    if (filters?.minPrice) query.set("minPrice", filters.minPrice);
    if (filters?.sort) query.set("sort", filters.sort);

    // serverFetch এর বদলে সরাসরি fetch ব্যবহার করুন কারণ এটি একটি পাবলিক API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties?${query.toString()}`, {
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("Failed to fetch public properties");
      return { success: false, data: [] };
    }

    const responseData = await res.json();
    
    // ব্যাকএন্ড যদি { success: true, data: [...] } ফরম্যাটে পাঠায়
    if (responseData.success && Array.isArray(responseData.data)) {
      return responseData.data;
    }
    
    // ব্যাকএন্ড যদি সরাসরি [...] অ্যারে পাঠায়
    return Array.isArray(responseData) ? responseData : [];

  } catch (error) {
    console.error("Get Properties Client Error:", error);
    return [];
  }
};

export default async function AllPropertiesPage({ searchParams }) {
  const resolvedParams = await searchParams; 
  const properties = await getProperties(resolvedParams);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        <FilterBar currentFilters={resolvedParams} />

        {properties.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white border border-dashed rounded-xl">
            No properties found matching the chosen parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item._id?.$oid || item._id} property={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}