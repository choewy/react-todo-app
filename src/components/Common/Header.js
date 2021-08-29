import React from 'react';
import Navbar from './Navbar';

const Header = () => {
    return (
        <div className="background">
            <div className="header">
                <div className="header-title">
                    React Todo App
                </div>
                <Navbar />
            </div>
        </div>
    )
}

export default Header;
