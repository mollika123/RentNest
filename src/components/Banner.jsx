"use client"; // এই লাইনটি কম্পোনেন্টকে ক্লায়েন্ট সাইড করে দেয়

import React, { useState } from 'react';
import { motion } from "framer-motion";
export default function Banner() {
  // সার্চ ফর্মের ডেটা ট্র্যাক করার জন্য স্টেট
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  });

  // ইনপুট চেঞ্জ হ্যান্ডেলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // সার্চ সাবমিট হ্যান্ডেলার
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchData);
    
    // এখানে আপনি আপনার API কল করতে পারেন অথবা কুয়েরি প্যারামিটার দিয়ে সার্চ পেজে রিডাইরেক্ট করতে পারেন।
    // উদাহরণ: router.push(`/properties?location=${searchData.location}...`)
  };

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-16 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: "url('/banner.jpeg')" }}>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
        
        className="relative z-10 max-w-5xl w-full text-center text-white mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          Find Your Perfect Nest
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-sm">
          Discover a seamless way to rent. Explore thousands of verified properties tailored to your budget and lifestyle.
        </p>
      </motion.div>

      {/* Glassmorphism Search Bar */}
      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* Location */}
          <div className="flex flex-col text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Location</label>
            <input 
              type="text"
              name="location"
              value={searchData.location}
              onChange={handleChange}
              placeholder="Where to?" 
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition"
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Property Type</label>
            <select 
              name="propertyType"
              value={searchData.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="condo">Condo</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="flex flex-col text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Min Price</label>
            <input 
              type="number"
              name="minPrice"
              value={searchData.minPrice}
              onChange={handleChange}
              placeholder="No Min" 
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition"
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Max Price</label>
            <input 
              type="number"
              name="maxPrice"
              value={searchData.maxPrice}
              onChange={handleChange}
              placeholder="No Max" 
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <button 
              type="submit" 
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-blue-600/30 text-sm"
            >
              Search Properties
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}