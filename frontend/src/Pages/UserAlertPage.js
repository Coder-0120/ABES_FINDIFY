import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import "../Styles/Alerts.css";

const UserAlertsPage = () => {
    const [foundMyLost, setFoundMyLost] = useState([]);
    const [claimedMyFound, setClaimedMyFound] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in first.");
            return;
        }

        axios.get("http://localhost:3000/api/viewall/alerts", {
            params: { email: user.email }
        })
        .then(res => {
            setFoundMyLost(res.data.foundMyLost);
            setClaimedMyFound(res.data.claimedMyFound);
        })
        .catch(err => console.error("Error fetching alerts:", err));
    }, []);

    return (
        <>
            <Navbar />
            <div className="alerts-container">
                <h2>📢 Alerts: Found My Lost Items</h2>
                <div className="alerts-grid">
                    {foundMyLost.length === 0 ? (
                        <p>No one has found your lost items yet.</p>
                    ) : (
                        foundMyLost.map((item, index) => (
                            <div className="alerts-card" key={index}>
                                <h3>{item.lostItemId?.itemName || "Item name not available"}</h3>
                                <p><strong>Claimer Email:</strong> {item.claimerEmail}</p>
                                <p><strong>Message:</strong> {item.message || "No message provided"}</p>
                                <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div><br/>

                <h2>✅ Alerts: Claimed My Found Items</h2>
                <div className="alerts-grid">
                    {claimedMyFound.length === 0 ? (
                        <p>No one has claimed your found items yet.</p>
                    ) : (
                        claimedMyFound.map((alert, index) => (
                            <div className="alerts-card" key={index}>
                                <h3>{alert.FoundItemId.itemName}</h3>
                                <p><strong>Claimer Email:</strong> {alert.claimerEmail}</p>
                                <p><strong>Message:</strong> {alert.message || "No message provided"}</p>
                                <p><strong>Date:</strong> {new Date(alert.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserAlertsPage;
