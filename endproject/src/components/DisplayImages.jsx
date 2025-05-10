import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🔥 Add this
import './DisplayImages.css';

const DisplayImages = () => {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // 🔥 Hook to navigate

  useEffect(() => {
    axios.get('http://localhost:9090/imageOrFile/fetch')
      .then(response => {
        const reversedData = response.data.reverse();
        setData(reversedData);

        const initialLikes = {};
        const initialComments = {};
        const initialNewComments = {};
        reversedData.forEach((_, index) => {
          initialLikes[index] = false;
          initialComments[index] = [];
          initialNewComments[index] = '';
        });

        setLikes(initialLikes);
        setComments(initialComments);
        setNewComments(initialNewComments);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleLike = (index) => {
    setLikes(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const openChat = (index) => {
    setActiveChatIndex(index);
  };

  const closeChat = () => {
    setActiveChatIndex(null);
  };

  const handleCommentChange = (value) => {
    setNewComments(prev => ({
      ...prev,
      [activeChatIndex]: value
    }));
  };

  const handleCommentSubmit = () => {
    const comment = newComments[activeChatIndex]?.trim();
    if (comment) {
      setComments(prev => ({
        ...prev,
        [activeChatIndex]: [...prev[activeChatIndex], comment],
      }));
      setNewComments(prev => ({ ...prev, [activeChatIndex]: '' }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="display-images-container">
      <div className="image-gallery">
        {data.map((item, index) => (
          <div key={index} className="image-card">
            <h3>{item.name}</h3>
            <img
              src={item.image}
              alt={item.name}
              className="image"
            />
            <p>{item.description}</p>

            <div className="interaction-buttons">
              {/* ❤️ Like Button */}
              <button
                onClick={() => toggleLike(index)}
                className={`like-button ${likes[index] ? 'liked' : ''}`}
              >
                ❤️
              </button>

              {/* 💬 Comment Icon */}
              <button
                onClick={() => openChat(index)}
                className="comment-button"
              >
                💬
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Button Fixed at Bottom */}
      <button
        className="post-button"
        onClick={() => navigate('/dashboard/post')} // 🔥 Navigate to PostImage.jsx route
      >
        Post
      </button>

      {/* Chat Panel */}
      {activeChatIndex !== null && (
        <div className="chat-panel">
          <button
            onClick={closeChat}
            className="close-chat-button"
          >
            ❌
          </button>
          <h4>Comments for: {data[activeChatIndex]?.name}</h4>
          <ul className="comments-list">
            {comments[activeChatIndex].map((cmt, i) => (
              <li key={i} className="comment-item">💬 {cmt}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Type your comment..."
            value={newComments[activeChatIndex]}
            onChange={(e) => handleCommentChange(e.target.value)}
            className="comment-input"
          />
          <button
            onClick={handleCommentSubmit}
            className="post-comment-button"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayImages;
