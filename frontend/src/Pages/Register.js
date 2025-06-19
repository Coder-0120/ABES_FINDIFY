import React, { useState } from 'react';
import '../Styles/Register.css';
import {  useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import axios from '../axios.js';

const RegisterPage = () => {
  const Navigate=useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: fullName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  try {
    const response = await axios.post("/api/users/register", payload);

    if (response.status === 201) {
      alert("🎉 Registration successful! Welcome to ABES Findify.");
      // localStorage.setItem("username", JSON.stringify({name:fullName}));
      Navigate("/login");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      alert(`❌ ${error.response.data.error}`);
    } else {
      alert("⚠️ Something went wrong. Please try again later.");
    }
    console.error("Axios registration error:", error);
  }
};
 
  

  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={e=>setFullName(e.target.value)}
         
        />
        <input
          type="email"
          placeholder="Email Address"
          required
           value={email}
          onChange={e=>setEmail(e.target.value)}
         
        />
        <input
          type="password"
          placeholder="Password"
          required
           value={password}
          onChange={e=>setPassword(e.target.value)}
         
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
           value={confirmPassword}
          onChange={e=>setConfirmPassword(e.target.value)}
         
        />
        <button type="submit">Register</button>
      </form>
      <div className="auth-footer">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
    <Footer/>
      </>
  );

};

export default RegisterPage;
