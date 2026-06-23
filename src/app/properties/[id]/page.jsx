import { getPropertyById } from '@/lib/api/property';
import React from 'react';
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import BookingModal from "@/components/BookingModal";
import ReviewSection from "@/components/ReviewSection";
import Image from 'next/image';

const PropertyDetailsPage = async ({ params }) => {
  const { id } = await params;
  const property = await getPropertyById(id);

  console.log("property",property);

  if (!property) {
    notFound();
  }

  const formattedRent = Number(property.monthlyRent || 0).toLocaleString();
  const formattedSize = Number(property.propertySize || 0).toLocaleString();

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/40 overflow-hidden">
        
        {/* ১. প্রোপার্টি ইমেজ সেকশন */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100">
          <Image width={600} height={600}
            src={property.imageUrl || "https://via.placeholder.com/1200x600"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ২. কন্টেন্ট লেআউট গ্রিড */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
     
          <div className="md:col-span-2 space-y-8">
            <div>
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {property.propertyType || "Residential"}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{property.title}</h1>
              <p className="text-gray-500 flex items-center gap-1 mt-1.5">
                <span className="text-lg text-pink-500">📍</span> {property.location}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* মূল স্পেসিফিকেশন */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl text-center">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Bedrooms</p>
                <p className="text-lg font-bold text-gray-800">{property.bedrooms || 0} Beds</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Bathrooms</p>
                <p className="text-lg font-bold text-gray-800">{property.bathrooms || 0} Baths</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Property Size</p>
                <p className="text-lg font-bold text-gray-800">{formattedSize} Sq Ft</p>
              </div>
            </div>

            {/* এমেনিটিজ তালিকা */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">Amenities Included</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-md capitalize">
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-100" />

            {/* ৩. নতুন রিভিউ সেকশন (এখানে ইউজার নাম দিয়ে রিভিউ দিতে পারবে) */}
            <ReviewSection propertyId={id} existingReviews={property.reviews || []} />
          </div>

          {/* ডানের কলাম: প্রাইসিং, বুকিং এবং ফেভারিট বাটন সাইডবার */}
          <div className="h-fit border border-gray-200 rounded-2xl p-6 bg-white shadow-sm space-y-4">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Rental Price</p>
              <div className="text-blue-600 font-extrabold text-3xl mt-1">
                ৳{formattedRent}
                <span className="text-sm font-medium text-blue-500"> /{property.rentType?.toLowerCase() || "month"}</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ক) বুক নাও বাটন মোডাল */}
            <BookingModal property={property} />

            {/* খ) বুক নাও বাটনের ঠিক নিচে অ্যাড টু ফেভারিট বাটন */}
            <FavoriteButton property={property} />

         
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;