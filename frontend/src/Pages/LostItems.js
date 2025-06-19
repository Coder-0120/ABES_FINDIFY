import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../axios.js';

import Navbar from '../Components/Navbar';
import '../Styles/LostItems.css'; 
import Footer from '../Components/Footer';

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemData, setEditItemData] = useState(null);



  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;
  const reportedBy = user ? user.email : "Anonymous User";


  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get("/api/lost/all");
        setItems(response.data.lostItems);
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.position = "scrolled";
          footer.style.bottom = "0";
          footer.style.left = "0";
          footer.style.width = "100%";
        }
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  const openClaimModal = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };


  const submitClaim = async () => {
    try {
      const payload = {
        lostItemId: selectedItemId,
        claimerEmail: reportedBy,
        message,
      };
      const res = await axios.post("/api/claims/create", payload);
      if (res.status === 201 || res.status === 200) {
        alert("Claim submitted successfully!");
        setShowModal(false);
        setMessage("");
      }
    } catch (err) {
      console.error("Error submitting claim:", err);
      alert("Failed to submit claim.");
    }
  };



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/lost/delete/${id}`);
      if (response.status === 200) {
        alert("Item deleted successfully!");
        setItems(items.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  const openEditModal = (item) => {
    setEditItemData({
      ...item,
      date: new Date(item.date).toISOString().split("T")[0], 
    });
    setShowEditModal(true);
  };


  
  const handleEditSubmit = async () => {
    try {
      const { _id, ...updatedData } = editItemData;

      const finalData = {
        ...updatedData,
        date: new Date(updatedData.date).toISOString(),
      };

      const res = await axios.put(`/api/lost/update/${_id}`, finalData);

      if (res.status === 200) {
        alert("Item updated successfully!");
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === _id ? { ...item, ...finalData } : item
          )
        );
      }
      setShowEditModal(false);
      window.location.reload();
        } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
      setShowEditModal(false); 
    }
  };





  return (
    <>
      <Navbar />
      <div className="items-container">
        <h2>📌 Reported Lost Items</h2>
        <div className="items-grid">
          {
            items.length > 0 ? (
              items.map((item) => {
                return (
                  <div className="item-card " key={item._id}>
                    <h3 >{item.itemName}</h3>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-GB')}</p>
                    <p><strong>Contact:</strong> {item.contact}</p>
                    <p><strong>id:</strong> {item._id}</p>

                    <p id="reported-by"><strong >Reported by: </strong><span id='bold'>{item.reportedBy}</span> </p>
                    {reportedBy !== item.reportedBy ? (
                      <div className="button-group">
                        <button className="button-report" onClick={() => openClaimModal(item._id)}>Report as Found</button>
                      </div>
                    ) : (
                      <div className="button-group">
                        <button className="button-edit" onClick={() => openEditModal(item)}>Edit</button>
                        <button className="button-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    )}

                  </div>
                )
              })
            ) : (
              <p>No lost items found.</p>
            )
          }
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>📝REPORTED THIS ITEM AS FOUND</h3>
            <textarea
              placeholder="Enter a short message for the owner (e.g., where you found it)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-submit" onClick={submitClaim}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editItemData && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Lost Item</h3>

            <input
              type="text"
              value={editItemData.itemName}
              onChange={(e) =>
                setEditItemData({ ...editItemData, itemName: e.target.value })
              }
              placeholder="Item Name"
            />

            <input
              type="text"
              value={editItemData.location}
              onChange={(e) =>
                setEditItemData({ ...editItemData, location: e.target.value })
              }
              placeholder="Location"
            />

            <textarea
              value={editItemData.description}
              onChange={(e) =>
                setEditItemData({ ...editItemData, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>

            <input
              type="text"
              value={editItemData.contact}
              onChange={(e) =>
                setEditItemData({ ...editItemData, contact: e.target.value })
              }
              placeholder="Contact Info"
            />

            <input
              type="date"
              value={new Date(editItemData.date).toISOString().split("T")[0]}
              onChange={(e) =>
                setEditItemData({ ...editItemData, date: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-submit"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
};

export default LostItems;
