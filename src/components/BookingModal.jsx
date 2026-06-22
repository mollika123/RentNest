"use client";
import React, { useState } from "react";

export default function BookingModal({ property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const bookingData = {
      propertyId: property._id?.$oid || property._id,
      title: property.title,
      price: property.monthlyRent,
      userName: userName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      moveInDate,
    };

    try {
      // এক্সপ্রেস ব্যাকএন্ডে বুকিং ডেটা পাঠানো হচ্ছে
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ফিক্স: বুকিং সফল হলে ব্যাকএন্ড থেকে আসা পেমেন্ট URL-এ রিডাইরেক্ট করবে
        // (যদি ব্যাকএন্ডে কোনো গেটওয়ে না থাকে, তবে সাময়িক টেস্টের জন্য আপনি ডাইরেক্ট ফ্রন্টএন্ড পেমেন্ট পেজে পাঠাতে পারেন)
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          // ব্যাকএন্ডে পেমেন্ট ইউআরএল না থাকলে ডামি হিসেবে ফ্রন্টএন্ডের /payment পেজে আইডি সহ পাঠাবে
          window.location.href = `/payment?bookingId=${data.insertedId}&amount=${property.monthlyRent}`;
        }
      } else {
        alert(data.error || "Something went wrong during booking.");
      }
    } catch (error) {
      console.error("Booking submit error:", error);
      alert("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* মেইন বুক বাটন */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-center bg-[#171717] hover:bg-[#262626] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors block shadow-sm"
      >
        Book Property
      </button>

      {/* মোডাল পপআপ */}
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

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Your Booking</h3>
                <p className="text-xs text-gray-400 mt-1">Property: {property.title}</p>
                <p className="text-xs font-bold text-blue-600 mt-0.5">Rent: ৳{Number(property.monthlyRent).toLocaleString()}</p>
              </div>

              <hr className="border-gray-100" />

              {/* ১. ইউজার নেম ফিল্ড */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* ২. ইমেইল ফিল্ড */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* ৩. ফোন নাম্বার ফিল্ড */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* ৪. মুভ-ইন ডেট ফিল্ড */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Target Move-In Date</label>
                <input
                  type="date"
                  required
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:border-gray-400 text-gray-700"
                />
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors shadow-sm mt-2"
              >
                {submitting ? "Processing..." : "Confirm Booking & Pay"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}