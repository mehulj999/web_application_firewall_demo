
import './SideBar.css';

import {FaAngleRight } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { FaFireAlt } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";


export default function SideBar({ children}) {
    return (

        <>
            <nav class='sidebar'>
                <header>
                    <div class='image-text'>
                        <span class='image'>
                            <img src="profilepic.jpg" alt="logo" />

                        </span>


                        <div class="text header-text">
                            <span class="name">Firewall</span>
                            <span className="profession">User</span>

                        </div>

                    </div>

                    {/* <FaAngleRight className='toggle' /> */}
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <a href="#">
                                    <LuFileSpreadsheet className='icon' />
                                    <span className="text nav-text"> Posts</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <IoSettingsSharp className='icon' />
                                    <span className="text nav-text"> Settings</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <HiAdjustmentsVertical className='icon' />
                                    <span className="text nav-text"> Rules</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FaFireAlt className='icon' />
                                    <span className="text nav-text"> Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class ="bottom-content">
                        <li className="">
                            <a href="/">
                                <RiLogoutBoxLine className='icon' />
                                <span className="text nav-text"> Logout</span>
                            </a>
                        </li>

                    </div>

                </div>

            </nav><script src='script.js'></script></>

    );
}