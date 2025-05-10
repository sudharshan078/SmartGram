import React, { useState } from 'react';
import axios from 'axios';
import "../styles/EventRegister.css";
const EventRegister = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username') || '',
    description: '',
    startTime: '',
    startDate: '',
    startYear: '',
    registrationLastTime: '',
    registrationLastDate: '',
    registrationLastYear: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please choose an image file.");
      return;
    }

    const submitData = new FormData();
    submitData.append("file", formData.file);
    submitData.append("description", formData.description);
    submitData.append("startTime", formData.startTime);
    submitData.append("startDate", formData.startDate);
    submitData.append("startYear", formData.startYear);
    submitData.append("registrationLastTime", formData.registrationLastTime);
    submitData.append("registrationLastDate", formData.registrationLastDate);
    submitData.append("registrationLastYear", formData.registrationLastYear);
    submitData.append("username", formData.username);

    try {
      const response = await axios.post("http://localhost:9090/explore/save", submitData);
      alert("Event registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to register event.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          disabled
          className="form-control"
        /><br />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br />

        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        /><br />

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        /><br />

        <label>Start Year:</label>
        <input
          type="number"
          name="startYear"
          value={formData.startYear}
          onChange={handleChange}
          required
        /><br />

        <label>Registration Last Time:</label>
        <input
          type="time"
          name="registrationLastTime"
          value={formData.registrationLastTime}
          onChange={handleChange}
          required
        /><br />

        <label>Registration Last Date:</label>
        <input
          type="date"
          name="registrationLastDate"
          value={formData.registrationLastDate}
          onChange={handleChange}
          required
        /><br />

        <label>Registration Last Year:</label>
        <input
          type="number"
          name="registrationLastYear"
          value={formData.registrationLastYear}
          onChange={handleChange}
          required
        /><br />

        <label>Choose Image:</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventRegister;

