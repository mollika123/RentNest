
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen py-8">
        <DashboardSidebar></DashboardSidebar>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;