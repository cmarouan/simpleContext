import React from 'react';
import './navbar.css';
import Logo from './images/logo.png';

export default function Navbar() {
    return (
        <div id="navbar">
            <img id="logo" src={Logo} alt="logo"/>
        </div>
    )
}
