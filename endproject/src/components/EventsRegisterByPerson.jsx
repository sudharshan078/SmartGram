import React, { useEffect, useState } from 'react';

const EventsRegisterByPerson = () => {
  const [username, setUsername] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('You must be logged in to view your registered events.');
      setLoading(false);
      return;
    }
    setUsername(storedUsername);

    // Fetch events registered by the user
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`http://localhost:9090/event/fetch/${encodeURIComponent(storedUsername)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registered events');
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading your registered events...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f8fa'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
        Events Registered by {username}
      </h2>
      {registrations.length === 0 ? (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
          You have not registered for any events yet.
        </p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {registrations.map((registration, index) => (
            <li key={index} style={{
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '10px',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                {registration.eventName || registration.fullName || 'Event'}
              </h3>
              {registration.place && <p><strong>Place:</strong> {registration.place}</p>}
              {registration.email && <p><strong>Email:</strong> {registration.email}</p>}
              {registration.mobileNumber && <p><strong>Mobile Number:</strong> {registration.mobileNumber}</p>}
              {registration.whatsappNumber && <p><strong>WhatsApp Number:</strong> {registration.whatsappNumber}</p>}
              {registration.registrationDate && <p><strong>Registered On:</strong> {new Date(registration.registrationDate).toLocaleDateString()}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsRegisterByPerson;
