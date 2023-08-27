import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;