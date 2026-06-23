"use client";
import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBookingsPage() {
  // ১। auth-client থেকে সেশন এবং লোডিং স্টেট একসাথে নিন (যাতে রিফ্রেশ দিলে লগআউট না হয়ে যায়)
  const { data: session, isPending } = useSession(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-bookings?email=${email}`
      );

      const responseData = await res.json();

      if (responseData.success && Array.isArray(responseData.data)) {
        setBookings(responseData.data);
      } else if (Array.isArray(responseData)) {
        setBookings(responseData);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchBookings();
    }
  }, [email]);

  // ⚠️ রিলোড প্রোটেকশন ফিক্স: সেশন চেক হওয়া পর্যন্ত পেজকে আটকে রাখুন, ডিরেক্ট রিজেক্ট করবেন না
  if (isPending || (loading && email)) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium mt-4 animate-pulse">Loading your bookings...</p>
      </div>
    );
  }

  // সেশন চেক শেষ হওয়ার পর যদি ইউজার সত্যি লগইন না থাকে, তখন Access Denied দেখান
  if (!session?.user) {
    return (
      <div className="p-6 text-center min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto mt-10">
        <div className="text-red-500 text-5xl mb-3">🛑</div>
        <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-500 mt-2">You must be logged in as a Tenant to view this dashboard.</p>
        <Link href="/login" className="mt-5 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your rented properties and payments.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100">
          Logged in as: <span className="font-semibold">{email}</span>
        </div>
      </div>

      {/* রিকোয়ারমেন্ট অনুযায়ী প্রফেশনাল রেসপন্সিভ টেবিল লেআউট */}
      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <th className="p-4">Property Name</th>
              <th className="p-4">Move-in / Booking Date</th>
              <th className="p-4">Amount Paid</th>
              <th className="p-4">Booking Status</th>
              <th className="p-4">Payment Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-400 font-medium">
                  <div className="text-4xl mb-2">📅</div>
                  No booking records found.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                  {/* প্রোপার্টি নেম */}
                  <td className="p-4 font-semibold text-gray-900">{b.propertyName}</td>
                  
                  {/* মুভ-ইন ডেট (যা রিকোয়ারমেন্টের প্রধান অংশ) */}
                  <td className="p-4 text-gray-600">
                    <div className="font-medium">
                      {b.moveInDate ? new Date(b.moveInDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
                    </div>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Paid on: {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  
                  {/* অ্যামাউন্ট পেইড (কারেন্সি ফরম্যাটসহ) */}
                  <td className="p-4 font-bold text-gray-900">
                    {Number(b.amount || 0).toLocaleString()}$
                  </td>
                  
                  {/* ওনারদের জন্য ডাইনামিক বুকিং স্ট্যাটাস (Pending, Approved, Rejected) */}
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-semibold capitalize ${
                      b.bookingStatus === 'confirmed' || b.bookingStatus === 'approved'
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : b.bookingStatus === 'rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        b.bookingStatus === 'confirmed' || b.bookingStatus === 'approved' ? 'bg-green-500' : b.bookingStatus === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></span>
                      {b.bookingStatus === 'confirmed' ? 'Approved' : b.bookingStatus}
                    </span>
                  </td>
                  
                  {/* পেমেন্ট স্ট্যাটাস */}
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full font-semibold capitalize ${
                      b.paymentStatus === 'paid' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}