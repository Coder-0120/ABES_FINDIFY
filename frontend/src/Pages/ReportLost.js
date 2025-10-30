import React, { useState } from 'react';
import '../Styles/ReportLost.css';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../axios.js';

const ReportLost = () => {
  const navigate=useNavigate();
  const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;
const reportedBy = user ? user.email : "Anonymous User"; 

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    contact: '',
    reportedBy: reportedBy

      

    // image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      reportedBy: reportedBy,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post("/api/lost/report",formData);
      if(response.status===201){
        alert("🎉 Lost item reported successfully!");
        console.log(reportedBy);
        navigate("/dashboard");
      }
    }
    catch(error){
      console.error("Error reporting lost item:", error);
      alert("❌ Failed to report lost item. Please try again.");
    }

  };

  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <h2>Report Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name *"
          required
          value={formData.itemName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location *"
          required
          value={formData.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Info *"
          required
          value={formData.contact}
          onChange={handleChange}
        />

        // <input
        //   type="file"
        //   name="image"
        //   accept="image/*"
        //   onChange={handleChange}
        // />

        <button type="submit">Submit Lost Item</button>
      </form>
    </div>
        </>

  );
};

export default ReportLost;
