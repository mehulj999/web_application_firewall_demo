import React, { ReactNode } from 'react';
import './SideBar.css';

import { FaAngleRight } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { FaFireAlt } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

interface SideBarProps {
  children?: ReactNode; // Defines the optional children prop
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img src="profilepic.jpg" alt="logo" />
            </span>

            <div className="text header-text">
              <span className="name">Firewall</span>
              <span className="profession">User</span>
            </div>
          </div>

          {/* <FaAngleRight className="toggle" /> */}
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <LuFileSpreadsheet className="icon" />
                  <span className="text nav-text">Posts</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <IoSettingsSharp className="icon" />
                  <span className="text nav-text">Settings</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <HiAdjustmentsVertical className="icon" />
                  <span className="text nav-text">Rules</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <FaFireAlt className="icon" />
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="/">
                <RiLogoutBoxLine className="icon" />
                <span className="text nav-text">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </nav>
      <script src="script.js"></script>
      {children}
    </>
  );
};

export default SideBar;
