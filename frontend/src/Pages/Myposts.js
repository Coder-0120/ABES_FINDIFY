import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Mypost.css";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MyPosts = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first.");
      return;
    }

    axios.get("http://localhost:3000/api/user/view/myposts", {
      params: { email: user.email }
    })
    .then(res => {
      setLostItems(res.data.lostItems);
      setFoundItems(res.data.foundItems);
    })
    .catch(err => {
      console.error("Error fetching posts", err);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="myposts-container">
        <h2>📌 My Lost Items</h2>
        <div className="myposts-grid">
          {lostItems.map(item => (
            <div className="myposts-card" key={item._id}>
              <h3>{item.itemName}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-GB')}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p className="myposts-reported-by"><strong>Reported by:</strong> <span className="myposts-bold">{item.reportedBy}</span></p>
            </div>
          ))}
        </div><br/>

        <h2>✅ My Found Items</h2>
        <div className="myposts-grid">
          {foundItems.map(item => (
            <div className="myposts-card" key={item._id}>
              <h3>{item.itemName}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-GB')}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p className="myposts-reported-by"><strong>Reported by:</strong> <span className="myposts-bold">{item.reportedBy}</span></p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPosts;
