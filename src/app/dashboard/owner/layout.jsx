import { requireRole } from '@/lib/core/session';
import React from 'react';

const OwnerLayout = async({ children }) => {
  await requireRole('owner')
 return children
};

export default OwnerLayout;