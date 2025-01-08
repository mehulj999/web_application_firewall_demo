import React from 'react';

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  return (
    <div className={className}>
      <h3>Sidebar</h3>
      <ul>
        <li>Dashboard</li>
        <li>Logs</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SideBar;
