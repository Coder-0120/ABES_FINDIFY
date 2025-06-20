// updated
import React, { useState } from 'react';
import '../Styles/Login.css';
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
// import axios from 'axios';
import axios from "../axios.js";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payLoad = {
      email,
      password
    };
    try {
      const response = await axios.post("/api/users/login", payLoad);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Welcome to ABES Findify!");
      Navigate("/dashboard"); 
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }

  }

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Login to ABES Findify</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
      <Footer />
    </>

  );

};

export default LoginPage;
