import React from 'react';
import {  Link } from 'react-router-dom';

import '../Styles/Footer.css'; // Adjust the path as necessary
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 ABES Findify. All rights reserved.</p>
      <div className="footer-links">
        <Link to="#features">Features</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </footer>
  );
};

export default Footer;
