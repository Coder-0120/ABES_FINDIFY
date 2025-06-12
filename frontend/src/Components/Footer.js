import React from 'react';
import '../Styles/Footer.css'; // Adjust the path as necessary
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 ABES Findify. All rights reserved.</p>
      <div className="footer-links">
        <a href="#features">Features</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </footer>
  );
};

export default Footer;
