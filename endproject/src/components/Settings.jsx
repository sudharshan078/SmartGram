import React, { useState, useEffect } from 'react';
import '../styles/Settings.css'; // Optional CSS file for styling

const Settings = () => {
  const [theme, setTheme] = useState('light');

  // Apply the selected theme to the body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleUpdateProfile = () => {
    // Navigate to update profile page or open modal
    console.log("Redirecting to Update Profile page...");
    // For example: navigate('/update-profile') if using useNavigate
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <section className="setting-section">
        <h3>Profile</h3>
        <button onClick={() => window.location.href = "/update-profile"}>
        Update Profile
      </button>     </section>

      <section className="setting-section">
        <h3>Theme Preferences</h3>
        <label className="theme-toggle">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </label>
      </section>
    </div>
  );
};

export default Settings;
