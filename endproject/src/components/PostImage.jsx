import React, { useState } from "react";
import axios from "axios";
import "../styles/PostImage.css";

const PostImage = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // 👇 Get username from localStorage (must be set at login)
  const username = localStorage.getItem("username");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!file || !name || !description || !username) {
      setMessage("Please fill all fields including login.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("username", username); // 👈 Add username here

    try {
      // Send a POST request to the backend to upload the image
      const response = await axios.post(
        "http://localhost:9090/imageOrFile/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display success or failure message
      setMessage(response.data);
      setName("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="upload-form-group">
          <label className="upload-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="upload-input"
          />
        </div>

        <div className="upload-form-group">
          <label className="upload-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="upload-textarea"
          ></textarea>
        </div>

        <div className="upload-form-group">
          <label className="upload-label">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="upload-file"
          />
        </div>

        <button type="submit" className="upload-button">Upload</button>
      </form>

      {message && (
        <p className={`upload-message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PostImage;
