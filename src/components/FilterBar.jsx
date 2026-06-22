"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function FilterBar({ currentFilters }) {
  const router = useRouter();
  const pathname = usePathname();

  // ইনপুট স্টেট সিঙ্ক্রোনাইজেশন
  const [location, setLocation] = useState(currentFilters?.location || "");
  const [propertyType, setPropertyType] = useState(currentFilters?.propertyType || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters?.maxPrice || "");
  const [minPrice, setMinPrice] = useState(currentFilters?.minPrice || "");
  const [sort, setSort] = useState(currentFilters?.sort || "");

  useEffect(() => {
    setLocation(currentFilters?.location || "");
    setPropertyType(currentFilters?.propertyType || "");
    setMaxPrice(currentFilters?.maxPrice || "");
    setMinPrice(currentFilters?.minPrice || "");
    setSort(currentFilters?.sort || "");
  }, [currentFilters]);

  // রাউটার ইউআরএল চেঞ্জ ফাংশন (যা সার্ভার রি-রেন্ডার ট্রিগার করে)
  const updateRouter = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname); 
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50 p-6 mb-12 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        
        {/* Input: Location */}
        <div className="relative flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2.5 focus-within:border-gray-400 transition-colors">
          <span className="text-gray-400 mr-2 text-lg">📍</span>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              updateRouter("location", e.target.value);
            }}
            className="w-full text-sm outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Select: Property Type */}
        <div className="relative flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2.5 focus-within:border-gray-400 transition-colors">
          <select
            value={propertyType}
            onChange={(e) => updateRouter("propertyType", e.target.value)}
            className="w-full text-sm outline-none text-gray-700 bg-transparent appearance-none cursor-pointer pr-4"
          >
            <option value="">Property Type</option>
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Apartment">Apartment</option>
          </select>
          <span className="absolute right-3 pointer-events-none text-xs text-gray-400">▼</span>
        </div>

        {/* Input: Max Price */}
        <div className="relative flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2.5 focus-within:border-gray-400 transition-colors">
          <span className="text-gray-400 mr-2 text-sm">$</span>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              updateRouter("maxPrice", e.target.value);
            }}
            className="w-full text-sm outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Input: Min Price */}
        <div className="relative flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2.5 focus-within:border-gray-400 transition-colors">
          <span className="text-gray-400 mr-2 text-sm">$</span>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              updateRouter("minPrice", e.target.value);
            }}
            className="w-full text-sm outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Select: Sort By */}
        <div className="relative flex items-center border border-gray-200 rounded-lg bg-white px-3 py-2.5 focus-within:border-gray-400 transition-colors">
          <span className="text-gray-400 mr-2 text-sm">⇅</span>
          <select
            value={sort}
            onChange={(e) => updateRouter("sort", e.target.value)}
            className="w-full text-sm outline-none text-gray-700 bg-transparent appearance-none cursor-pointer pr-4"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
          </select>
          <span className="absolute right-3 pointer-events-none text-xs text-gray-400">▼</span>
        </div>

      </div>

      {/* Reset Filter Button */}
      <div className="flex justify-end mt-1">
        <button
          onClick={handleReset}
          className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg transition-colors shadow-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}