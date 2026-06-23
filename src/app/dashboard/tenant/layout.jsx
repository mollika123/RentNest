import { requireRole } from '@/lib/core/session';
import React from 'react';

const TenantLayoutPage = async ({ children }) => {
  await requireRole('tenant')
  return children;
};

export default TenantLayoutPage;