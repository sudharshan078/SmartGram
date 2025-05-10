import React, { useEffect, useState } from 'react';

const Friends = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUsername = localStorage.getItem('username');
  const DEFAULT_IMAGE =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCm6U-R7Dh4WAGASSJFN9RaPTnxmDeV1cVqitzJ1yXslCORiVstDy8rB0YgI5YCRkCJo&usqp=CAU';

  useEffect(() => {
    fetchUsersAndProfiles();
    fetchMyFriends();
  }, [loggedInUsername]);

  const fetchUsersAndProfiles = async () => {
    try {
      const [usersRes, profilesRes] = await Promise.all([
        fetch('http://localhost:9090/api/user/all'),
        fetch('http://localhost:9090/profile/fetch'),
      ]);

      if (!usersRes.ok) throw new Error(`Failed to fetch users. Status: ${usersRes.status}`);
      if (!profilesRes.ok) throw new Error(`Failed to fetch profiles. Status: ${profilesRes.status}`);

      const users = await usersRes.json();
      const profiles = await profilesRes.json();

      const mergedUsers = users
        .filter(user => user.username !== loggedInUsername)
        .map(user => {
          const profile = profiles.find(p => p.username === user.username);
          return {
            username: user.username,
            profileImage: profile?.profileImage?.startsWith('data:image')
              ? profile.profileImage
              : profile?.profileImage
              ? `data:image/jpeg;base64,${profile.profileImage}`
              : null,
          };
        });

      setAllUsers(mergedUsers);
    } catch (err) {
      setError(`Error fetching users and profiles: ${err.message}`);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMyFriends = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/friend/all');
      if (!response.ok) throw new Error(`Failed to fetch friends. Status: ${response.status}`);
      const friendLinks = await response.json();
      const friends = friendLinks
        .filter(link => link.username === loggedInUsername)
        .map(link => link.friendUsername);
      setMyFriends(friends);
    } catch (err) {
      setError(`Error fetching friends: ${err.message}`);
    }
  };

  const handleAddFriend = async friendUsername => {
    try {
      const response = await fetch('http://localhost:9090/api/friend/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUsername, friendUsername }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Failed to add friend: ${msg}`);
      }

      // Remove from list immediately
      setAllUsers(prevUsers => prevUsers.filter(user => user.username !== friendUsername));
      
      // Update myFriends for consistency
      setMyFriends(prev => [...prev, friendUsername]);
    } catch (err) {
      setError(`Error adding friend: ${err.message}`);
    }
  };

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Add Friends</h2>
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : allUsers.length === 0 ? (
        <p>No users available to add.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {allUsers.map(user => (
            <div key={user.username} style={{ width: '140px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '12px', padding: '10px' }}>
              <img
                src={user.profileImage || DEFAULT_IMAGE}
                alt={user.username}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <p style={{ wordBreak: 'break-word', marginTop: '8px', fontWeight: '600' }}>{user.username}</p>
              <button
                onClick={() => handleAddFriend(user.username)}
                style={{
                  padding: '8px 15px',
                  borderRadius: '6px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
