import React, { Component, ChangeEvent, FormEvent, ReactNode, useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './ProfilePage.css';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';


interface ProfileAreaProps {
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
  
  const ProfileArea: React.FC<ProfileAreaProps> = ({ children }) => {
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
      <div className="profile-area">
            {/* <h2>{profile?.name || "User"}</h2>
            <p>Phone: {profile?.phone_number}</p>
            <p>Date of Birth: {profile?.date_of_birth}</p>
            <p>Address: {profile?.address}</p> */}

            {/* <div className="right">
                <div className="info">
                    <h3>Information</h3>
                    <div className="info_data">
                        <div className="data">
                            <h3>Email</h3>
                            <p>alex@gmail.com</p>
                        </div>
                        <div className="data">
                        <h3>Phone</h3>
                            <p>0001-213-998761</p>
                    </div>
                    </div>
                </div>
            
                <div className="projects">
                    <h3>Projects</h3>
                    <div className="projects_data">
                        <div className="data">
                            <h3>Recent</h3>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="data">
                        <h3>Most Viewed</h3>
                            <p>dolor sit amet.</p>
                    </div>
                    </div>
                </div>
            
                <div className="social_media">
                    <ul>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                </ul>
                </div>

            </div> */}



            <div className="card">
                <div className="img">
                    <img className= "imgg" src="profilepic.jpg" alt="profile" />
                </div>
                    <div className='info'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h3>Full Name</h3>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {profile?.name || "User"}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h3>Email</h3>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {user?.email}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h3>Phone</h3>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {profile?.phone_number}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h3>Date of Birth</h3>

                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {profile?.date_of_birth}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h3>Address</h3>
                                </div>
                                <div className='col-md-9 text-secondary'>
                                    {profile?.address}
                                </div>
                            </div>

                    </div>


                <br />
        
            </div>

                



            <div className='left'>
                <div className="fire">
                    <div className="fire-left">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-center">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-right">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-bottom">
                        <div className="main-fire"></div>
                    </div>
                </div>
            </div>


            <div className='right'>
                <div className="fire">
                    <div className="fire-left">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-center">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-right">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-bottom">
                        <div className="main-fire"></div>
                    </div>
                </div>
            </div>











            {children}
        </div>

    );
  };



















const ProfilePage: React.FC = () => {
    const { user, loading } = useAuth();
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="mainpage-main">
        <SideBar />
        <div style={{ marginLeft: '0px', flex: 1 }}>
          {user && ( <ProfileArea /> )}
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  