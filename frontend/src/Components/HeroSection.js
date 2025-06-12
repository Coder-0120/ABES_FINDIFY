import React from 'react';
import '../Styles/HeroSection.css'; 
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const user=localStorage.getItem("user");
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to <span>ABES Findify</span></h1>
        <p>Your smart campus lost & found platform.</p>
        <Link to={user?"/dashboard":"/login"}><button className="btn-primary"  >Get Started</button></Link>
      </div>
    </section>
  );
};

export default HeroSection;
