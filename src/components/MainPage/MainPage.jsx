
import React from 'react';
import SideBar from '../global/SideBar';
import './MainPage.css';

const MainPage = () => {
    return (
        <div class='mainpage-main'>
            <SideBar className="mainpage-sidebar" />
            <div style={{ marginLeft: '0px', padding: '20px', flex: 1 }}>
                <h1>Welcome to the Main Page</h1>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
};

export default MainPage;
