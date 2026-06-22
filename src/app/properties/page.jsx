import React from "react";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import { serverFetch } from "@/lib/core/server";

// ব্যাকএন্ড ফিল্টারিং ডেটা ফেচিং মেথড
export const getProperties = async (filters) => {
  const query = new URLSearchParams();
  
  // সেফলি চেক করে কুয়েরি প্যারামিটারগুলো বিল্ড করা হচ্ছে
  if (filters?.location) query.set("location", filters.location);
  if (filters?.propertyType) query.set("propertyType", filters.propertyType);
  if (filters?.maxPrice) query.set("maxPrice", filters.maxPrice);
  if (filters?.minPrice) query.set("minPrice", filters.minPrice);
  if (filters?.sort) query.set("sort", filters.sort);

  const response = await serverFetch(`/api/properties?${query.toString()}`);
  return response || [];
};

// Next.js-এর নিয়ম অনুযায়ী searchParams অবজেক্টটিকে ফিউচার-প্রুফ করতে async/await ব্যবহার করা ভালো
export default async function AllPropertiesPage({ searchParams }) {
  
  // ১. সল্যুশন: searchParams প্রোমিজ হতে পারলে সেটিকে সেফলি রেজলভ বা অ্যাওয়েট করে নেওয়া
  const resolvedParams = await searchParams; 
  
  // ডেটা ফেচিং মেথডে রেজলভড প্যারামিটার পাঠানো হচ্ছে
  const properties = await getProperties(resolvedParams);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ফিল্টার বার - রেজলভড ফিল্টারগুলো পাস করা হচ্ছে */}
        <FilterBar currentFilters={resolvedParams} />

        {/* ৩-কলাম রেসপন্সিভ গ্রিড (Screenshot 2026-06-21 185939.jpg লেআউট) */}
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