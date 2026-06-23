"use client";
import { getPropertyById } from "@/lib/api/property";
import React, { useState } from "react";

export default function BookingModal({ property }) {
  
  console.log(property);
  const [isOpen, setIsOpen] = useState(false);
 
  
  const propertyId = property._id?.$oid || property._id;

  return (
    <>
     
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-center bg-[#171717] hover:bg-[#262626] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors block shadow-sm"
      >
        Book Property
      </button>

     
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-gray-100 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* ক্লোজ বাটন */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-sm"
            >
              ✕
            </button>

   
            <form 
              action="/api/checkout_sessions" 
              method="POST" 
              className="space-y-4"
            >

            
         
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Your Booking</h3>
                <p className="text-xs text-gray-400 mt-1">Property: {property.title}</p>
                <p className="text-xs font-bold text-blue-600 mt-0.5">Rent: ৳{Number(property.monthlyRent).toLocaleString()}</p>
              </div>

              <hr className="border-gray-100" />

        
              <input type="hidden" name="propertyId" value={propertyId} />
              <input type="hidden" name="title" value={property.title} />
              <input type="hidden" name="price" value={property.monthlyRent} />

  
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Your Name</label>
                <input
                  type="text"
                  name="userName"
                  required
                  placeholder="John Doe"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

           
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="johndoe@example.com"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

       
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* ৪. মুভ-ইন ডেট ফিল্ড */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Target Move-In Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  required
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"     
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors shadow-sm mt-2"
              >
                Confirm Booking & Pay
              </button>
            </form>
            
          </div>
        </div>
      )}
    </>
  );
}