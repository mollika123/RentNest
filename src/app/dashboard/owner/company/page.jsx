import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { getOwnerAgency } from '@/lib/api/agency'; // API পাথ রিনেম করা হয়েছে
import OwnerProfile from './OwnerProfile';

const OwnerProfilePage = async () => {
  
    const user = await getUserSession();
    

    const ownerAgencyData = await getOwnerAgency(user?.id || user?._id);

    return (
        <div className="w-full min-h-screen bg-black px-4 py-6">
         
            <OwnerProfile 
                owner={user} 
                ownerAgency={ownerAgencyData} 
            />
        </div>
    );
};

export default OwnerProfilePage;