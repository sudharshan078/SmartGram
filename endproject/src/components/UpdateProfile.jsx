import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UpdateProfile.css";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSaveProfile = () => {
    if (!username || !bio) {
      alert("Username or Bio is missing.");
      return;
    }

    // Swap the username and bio
    const swappedUsername = bio;  // Bio becomes the new username
    const swappedBio = username;  // Username becomes the new bio

    const formData = new FormData();
    formData.append("username", swappedUsername); // Use swapped username
    formData.append("bio", swappedBio);           // Use swapped bio
    if (imageFile) {
      formData.append("file", imageFile);  // File remains the same
    }

    fetch("http://localhost:9090/profile/save", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save profile");
        return res.text();
      })
      .then(() => {
        alert("Profile saved successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Save failed.");
      });
  };

  return (
    <div className="update-container">
      <form
        className="update-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
      >
        <h2 className="form-title">Update Profile</h2>

        <label>Username</label>
        <input
          type="text"
          value={username}
          readOnly
          className="input-field readonly"
        />

        <label>Bio</label>
        <textarea
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="input-field"
        ></textarea>

        <label>Choose Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />

        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
