import React from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("username"));
  console.log(userName);
  // const userName2 = userName ? userName.name : '';

  return (
    <>
    <Navbar/>
    <motion.div
      className="dashboard-container"
     
    >
      <h2 className="dashboard-heading">Welcome, <span>{userName || 'Student'}</span> 👋</h2>

      <div className="dashboard-grid">
        <button className="dash-btn" onClick={() => navigate('/lost-items')}>
          🔍 View Lost Items
        </button>
        <button className="dash-btn" onClick={() => navigate('/found-items')}>
          🎒 View Found Items
        </button>
        <button className="dash-btn" onClick={() => navigate('/report-lost')}>
          ➕ Report Lost Item
        </button>
        <button className="dash-btn" onClick={() => navigate('/report-found')}>
          📦 Report Found Item
        </button>
        <button className="dash-btn" onClick={() => navigate('/myposts')}>
          📜 My Posts
        </button>
        <button className="dash-btn" onClick={() => navigate('/claims')}>
          🔔 Claims / Requests
        </button>
      </div>
    </motion.div>
  </>
  );
}
;

export default Dashboard;
