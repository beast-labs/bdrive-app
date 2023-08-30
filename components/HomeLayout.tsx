import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
    <Navbar/>
    <div>
      <h1 className={`mb-3 text-2xl font-semibold`}>Welcome to Bdrive!</h1>
      {children}
    </div>
    </>
  );
};

export default HomeLayout;