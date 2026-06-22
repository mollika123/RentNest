import React from 'react';
import AddProperty from './AddProperty';
import { getLoggedInAgency } from '@/lib/api/agency';

const PostPropertyPage = async() => {
  const agency = await getLoggedInAgency()
  console.log("Agency",agency);
  return (
    <div>
      <AddProperty agency={agency}></AddProperty>
    </div>
  );
};

export default PostPropertyPage;