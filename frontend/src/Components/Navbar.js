import React from 'react';
import '../Styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const loginuser = localStorage.getItem("user");
  const userdetails = JSON.parse(localStorage.getItem("user"))?.email || "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container-fluid">
        <span className="navbar-brands navbar-logo">ABES Findify</span>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-links">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#features">Features</Link>
            </li>
            {loginuser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={() => window.scrollTo(0, 0)}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <span id="username" className="nav-links">{userdetails}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-alink logout-btn" to="/" onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

