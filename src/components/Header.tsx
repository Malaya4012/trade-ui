import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Global Trade Logo" />
      </div>
      <nav className="nav-menu">
        <Link to="/solutions">Solutions</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
