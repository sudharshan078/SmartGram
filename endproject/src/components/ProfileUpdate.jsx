import React, { useState } from 'react';

const ProfileUpdate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:9090/profile/save', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Profile picture uploaded successfully!');
      } else {
        setMessage('Failed to upload image!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading image!');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Update Profile Picture</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {previewUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '1rem', color: message.includes('success') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
