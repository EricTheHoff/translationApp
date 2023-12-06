import React from 'react';
import '../Styles/navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <a href="/">translationApp</a>
                <a href="/map">Map</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
                <a href="/account">Profile</a>
            </nav>
        </div>
    );
}

export default Navbar;
