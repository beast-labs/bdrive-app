import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
    <Navbar/>
    <div>
      <h1> Dashboard : Breadcrumbs Text</h1>
      {children}
    </div>
    </>
  );
};

export default DashboardLayout;