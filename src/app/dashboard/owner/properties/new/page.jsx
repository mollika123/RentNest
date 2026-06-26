import React from 'react';
import AddProperty from './AddProperty';
import { getLoggedInAgency } from '@/lib/api/agency';

const PostPropertyPage = async() => {
 
  return (
    <div>
      <AddProperty ></AddProperty>
    </div>
  );
};

export default PostPropertyPage;