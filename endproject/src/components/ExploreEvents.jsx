import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExploreEvents.css';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:9090/explore/fetch');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderImage = (imgData) => {
    if (!imgData) return null;
    if (imgData.startsWith('http') || imgData.startsWith('data:image')) {
      return imgData;
    }
    return `data:image/jpeg;base64,${imgData}`;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedEvent(null);
  };

  const handleRegisterClick = (event) => {
    navigate('/specific-event-register', { state: { event } });
  };

  const handlePostEventClick = () => {
    navigate('/event-register');
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="display-images-container">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Explore Events</h1>
      <div className="image-gallery">
        {events.map((event, index) => (
          <div key={index} className="image-card" onClick={() => handleEventClick(event)}>
            <img
              src={renderImage(event.image)}
              alt={`event-${index}`}
              className="image"
            />
            {event.description && <p>{event.description}</p>}
          </div>
        ))}
      </div>

      {popupVisible && selectedEvent && (
        <div className="popup-container">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>&times;</button>
            <h2 style={{ marginBottom: '10px' }}>Event Details</h2>
            <p><strong>Start Time:</strong> {selectedEvent.startTime}</p>
            <p><strong>Start Date:</strong> {selectedEvent.startDate}</p>
            <p><strong>Start Year:</strong> {selectedEvent.startYear}</p>
            <p><strong>Registration Deadline:</strong> {selectedEvent.registrationLastTime}</p>
            <p><strong>Registration Deadline Date:</strong> {selectedEvent.registrationLastDate}</p>
            <p><strong>Registration Deadline Year:</strong> {selectedEvent.registrationLastYear}</p>
            <button className="register-button" onClick={() => handleRegisterClick(selectedEvent)}>Register</button>
          </div>
        </div>
      )}

      <button className="post-event-button" onClick={handlePostEventClick} style={{ width: '300px' }}>
        Post Event
      </button>
    </div>
  );
};

export default ExploreEvents;
