import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Posts.css"; // Make sure you have the necessary styles

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  // 👇 Get the username from localStorage (must be set at login)
  const username = localStorage.getItem("username");

  // 👇 Fetch posts by username from API
  useEffect(() => {
    if (!username) {
      setMessage("Please log in to see your posts.");
      return;
    }

    // Fetch posts from the backend for the logged-in user
    axios
      .get(`http://localhost:9090/imageOrFile/fetchByUsername?username=${username}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setMessage("Failed to load posts.");
      });
  }, [username]);

  return (
    <div className="posts-container">
      <h2 className="posts-title">My Posts</h2>

      {message && <p className="posts-message">{message}</p>}

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post, index) => (
            <div key={index} className="post-item">
              <h3 className="post-name">{post.name}</h3>
              <img
                src={post.image} // Image should be in base64 format from the backend
                alt={post.name}
                className="post-image"
              />
              <p className="post-description">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
