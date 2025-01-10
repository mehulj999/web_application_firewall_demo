import React, { ReactNode, useState, useEffect } from 'react';
import './SideBar.css';
import LogoutButton from '../LogoutButton';
import { LuFileSpreadsheet } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { BsClipboard2Data } from "react-icons/bs";
import { useAuth } from "../../AuthContext";
import { Link } from 'react-router-dom';

interface SideBarProps {
  children?: ReactNode; // Defines the optional children prop
}

interface Profile {
  name: string;
  phone_number: string;
  date_of_birth: string;
  address: string;
}

const fetchProfile = async (user_id: number): Promise<Profile> => {
  const response = await fetch(`/users/${user_id}/profile`, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch profile');
  const data = await response.json();
  return data;
};

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id).then(setProfile).catch(console.error);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img src="profilepic.jpg" alt="logo" />
            </span>

            <div className="text header-text">
              <span className="name">{profile?.name || "Firewall"}</span>
              <span className="profession">{user?.email || "User"}</span>
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
              {user?.is_admin && (
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
      {children}
    </>
  );
};

export default SideBar;
