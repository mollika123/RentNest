"use client"
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import { CircleDollar, House, Calendar } from "@gravity-ui/icons";
import React from 'react';

const OwnerPage = () => {
   const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>
  }
  const ownerStats = [
    { 
        title: "Total Earnings", 
        value: "$12,450", // এখানে আপনার এপিআই থেকে আসা আসল সামেশন ভ্যালু বসবে
        icon: CircleDollar 
    },
    { 
        title: "Total Properties", 
        value: "8",        // ওনারের মোট তৈরি করা প্রোপার্টির সংখ্যা
        icon: House 
    },
    { 
        title: "Total Bookings", 
        value: "142",      // ওনারের প্রোপার্টিগুলোতে মোট কনফার্মড বুকিং সংখ্যা
        icon: Calendar 
    },
];
   const user = session?.user;
    console.log("Session data in RecruiterDashboardHomePage:", session);
  return (
    <div>
      <h2 className="text-4xl">Welcome back, {user?.name}</h2>
      <DashboardStats statsData={ownerStats}></DashboardStats>
      owner
    </div>
  );
};

export default OwnerPage;