import React, { ReactNode } from 'react';
import './SideBar.css';
import LogoutButton  from '../LogoutButton';
import { FaAngleRight } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaFireAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsClipboard2Data } from "react-icons/bs";
import { useAuth } from "../../AuthContext";

interface SideBarProps {
  children?: ReactNode; // Defines the optional children prop
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const { user, loading } = useAuth();
  var condition = user?.is_admin;
  console.log(condition);
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
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
            <li className="nav-link">
              <Link to="/home">
                <LuFileSpreadsheet className="icon" />
                <span className="text nav-text">Posts</span>
              </Link>
            </li>
              <li className="nav-link">
              <Link to="/profile">
                  <CgProfile className="icon" />
                  <span className="text nav-text">Profile</span>
              </Link>
              </li>
              {condition && (
                <li className="nav-link">
                  <Link to="/monitoring">
                    <BsClipboard2Data className="icon" />
                    <span className="text nav-text">Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <LogoutButton />
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
