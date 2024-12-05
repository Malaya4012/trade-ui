import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/SignIn.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Global Trade e-Solutions. All rights reserved.</p>
        <nav className="footer-nav">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div className="social-media">
          <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
