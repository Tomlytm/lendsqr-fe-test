import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar.tsx';
import TopBar from '../TopBar/TopBar.tsx';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <TopBar />
      <div className="layout">
        <Sidebar />
        <div className="layout__content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
