import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUserCircle, FaBars } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    navigate("/contact");
  };
  const handleAboutClick = () => {
    navigate("/about");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>SmartGram</Link>
        </h1>
      </div>

      <div className="navbar-right">
        <div className="icon-container">
          <div className="navbar-icon" onClick={handleAboutClick} style={{ cursor: 'pointer' }}>
            <img 
              src="data:image/png;base64,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" 
              alt="Call Icon" 
              style={{ width: 30, height: 30 }}
            />
          </div>

          {/* ✅ Route to Contact.jsx when Call icon clicked */}
          <div className="navbar-icon" onClick={handleContactClick} style={{ cursor: 'pointer' }}>
            <img 
              src="data:image/png;base64,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" 
              alt="Call Icon" 
              style={{ width: 30, height: 30 }}
            />
          </div>

          <div className="navbar-icon" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <FaUserCircle size={24} />
          </div>
          <button className="menu-icon" onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-content">
            <Link to="/explore" className="dropdown-item" onClick={() => setMenuOpen(false)}>Explore</Link>
            <Link to="/friends" className="dropdown-item" onClick={() => setMenuOpen(false)}>Friend List</Link>
            <div className="dropdown-item" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              Profile
            </div>
            <div className="dropdown-item" onClick={handleSettingsClick} style={{ cursor: 'pointer' }}>
              Settings
            </div>
          </div>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
