import React, { useState } from 'react';
import '../Styles/ReportFound.css';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../axios.js';

const ReportFound = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    contact: '',
    reportedBy: JSON.parse(localStorage.getItem("user"))?.email || "Anonymous User", 
    // image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response=await axios.post("/api/found/report", formData);
      if(response.status===201){
        alert("🎉 Found item reported successfully!");
        navigate("/dashboard");
      }
    }
    catch(error){
      console.error("Error reporting found item:", error);
      alert("❌ Failed to report found item. Please try again.");
    }

  };

  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <h2>Report Found Item</h2>
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

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Submit Found Item</button>
      </form>
    </div>
        </>

  );
};

export default ReportFound;
