import AllPropertiesTable from '@/components/AllPropertiesTable';
import React from 'react';

const AdminAllPropertiesPage =async () => {
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/properties`,
    {
      cache: "no-store",
    }
  );

  const properties = await res.json();
  console.log(properties);
  return (
    <div>
      <h2 className="text-5xl">All Properties</h2>
      <AllPropertiesTable properties={properties}></AllPropertiesTable>
    </div>
  );
};

export default AdminAllPropertiesPage;