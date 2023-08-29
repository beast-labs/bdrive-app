import React from 'react';
import './globals.css'
import HomeLayout from '../components/HomeLayout';

const HomePage: React.FC = () => {
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 p-4 rounded">
          <p className="text-white text-center">Home</p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;