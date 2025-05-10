import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyFriends.css'; // Optional: for styling

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username'); // Assuming this is how user is tracked

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendUsernamesRes = await axios.get(`http://localhost:9090/api/friend/all?username=${username}`);
        const friendUsernames = friendUsernamesRes.data;

        const friendProfiles = await Promise.all(
          friendUsernames.map(async (friendUsername) => {
            const profileRes = await axios.post('http://localhost:9090/profile/fetch', {
              username: friendUsername
            });
            return profileRes.data;
          })
        );

        setFriends(friendProfiles);
      } catch (err) {
        setError('Failed to load friends.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchFriends();
    } else {
      setError("No user is logged in.");
      setLoading(false);
    }
  }, [username]);

  if (loading) return <div>Loading friends...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-friends-container">
      <h2>My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <div className="friends-list">
          {friends.map((friend, index) => (
            <div className="friend-card" key={index}>
              <img
                src={friend.profileImageUrl || '/default-profile.png'}
                alt={`${friend.username}'s profile`}
                className="friend-image"
              />
              <div className="friend-info">
                <h3>{friend.name || friend.username}</h3>
                <p>@{friend.username}</p>
                <p>{friend.bio || 'No bio available'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFriends;
