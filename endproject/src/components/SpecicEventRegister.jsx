import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpecicEventRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    place: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
  });

  // ✅ Get username from localStorage only once after component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('You must be logged in to access this form.');
      navigate('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username, // Automatically included, not shown in form
      ...formData,
    };

    try {
      const response = await fetch('http://localhost:9090/event/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData({
          fullName: '',
          place: '',
          email: '',
          mobileNumber: '',
          whatsappNumber: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save data'}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Specific Event Registration
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: '600' }}>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          style={inputStyle}
        />

        <label style={{ fontWeight: '600' }}>Place:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
          placeholder="Enter your place"
          style={inputStyle}
        />

        <label style={{ fontWeight: '600' }}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          style={inputStyle}
        />

        <label style={{ fontWeight: '600' }}>Mobile Number:</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          pattern="[0-9]{10,15}"
          title="Enter a valid mobile number (10-15 digits)"
          placeholder="Enter your mobile number"
          style={inputStyle}
        />

        <label style={{ fontWeight: '600' }}>WhatsApp Number:</label>
        <input
          type="tel"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleChange}
          required
          pattern="[0-9]{10,15}"
          title="Enter a valid WhatsApp number (10-15 digits)"
          placeholder="Enter your WhatsApp number"
          style={{ ...inputStyle, marginBottom: '25px' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0, 242, 254, 0.6)',
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

export default SpecicEventRegister;
