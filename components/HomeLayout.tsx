import React, { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <h1>Home Nav Bar</h1>
      {children}
    </div>
  );
};

export default HomeLayout;