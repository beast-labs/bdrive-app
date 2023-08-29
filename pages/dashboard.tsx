import React from 'react';
import './globals.css'
import DashboardLayout from '../components/DashboardLayout';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-blue-500 p-4 rounded">
            <p className="text-white text-center">Dashboard</p>
          </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;