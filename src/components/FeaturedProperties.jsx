"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch featured properties");
        }

        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Featured fetch error:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 container mx-auto px-4">
      {/* HEADER */}
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-widest text-violet-500 font-bold"
        >
          Curated Listings
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold mt-2 text-black dark:text-white"
        >
          Featured Properties
        </motion.h2>

        <p className="text-gray-500 max-w-xl mx-auto text-sm mt-3">
          Discover handpicked, verified rental properties for you.
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-400">
          No featured properties found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((item) => (
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;