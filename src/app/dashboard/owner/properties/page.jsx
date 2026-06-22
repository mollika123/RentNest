import OwnerPropertyTable from '@/components/dashboard/OwnerPropertyTable';
import { getLoggedInAgency } from '@/lib/api/agency';
import { getProperty } from '@/lib/api/property';
import React from 'react';

const OwnerProperty =async () => {
  const agency=await getLoggedInAgency()
 
  const properties = agency?._id
    ? await getProperty(agency._id)
    : [];
  console.log('properties',properties);
  return (
    <div>
      <OwnerPropertyTable properties={properties}></OwnerPropertyTable>
    </div>
  );
};

export default OwnerProperty;