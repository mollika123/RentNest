"use client";
import React, { useState } from "react";


export default function FavoriteButton({ property }) {
  console.log("property",property);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
    const response = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      propertyId: property._id,
      propertyName: property.title,
      monthlyRent: property.monthlyRent,
      location: property.location,
    }),
  }
);
      const data = await response.json();

      if (response.ok && data.success) {
        setIsFavorite(!isFavorite);
      } else {
        alert(data.error || "Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert("Could not connect to the backend server for favorites.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 font-semibold text-sm py-3 px-4 rounded-xl border transition-all active:scale-[0.99] ${
        isFavorite
          ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
      }`}
    >
      <svg
        className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500 fill-none"}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {loading ? "Processing..." : isFavorite ? "Saved to Favorites" : "Add to Favorites"}
    </button>
  );
}