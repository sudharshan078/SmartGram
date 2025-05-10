import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Profile.css";

const DEFAULT_BIO = "Bio is not updated";
const DEFAULT_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCm6U-R7Dh4WAGASSJFN9RaPTnxmDeV1cVqitzJ1yXslCORiVstDy8rB0YgI5YCRkCJo&usqp=CAU";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchAndUpdateProfile = async () => {
      try {
        const storedUsernameRaw = localStorage.getItem("username");
        if (!storedUsernameRaw) {
          console.warn("No username in localStorage");
          return;
        }

        const storedUsername = storedUsernameRaw.trim().toLowerCase();
        setUsername(storedUsernameRaw); // Display the original username from localStorage

        // Fetch profiles from the API
        const response = await fetch("http://localhost:9090/profile/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }

        const profiles = await response.json();

        // Look for the profile that matches the username
        let userProfile = profiles.find(
          (profile) => profile.username?.trim().toLowerCase() === storedUsername
        );

        // If no profile is found by username, check by bio
        if (!userProfile) {
          userProfile = profiles.find(
            (profile) => profile.bio?.trim().toLowerCase() === storedUsername
          );

          if (userProfile) {
            const newUsername = userProfile.bio?.trim();
            setUsername(newUsername || storedUsernameRaw);
            setBio(newUsername || DEFAULT_BIO);

            // Set the profile image if available
            if (userProfile.profileImage) {
              const imageUrl = `data:image/jpeg;base64,${userProfile.profileImage}`;
              setProfileImage(imageUrl);
            }

            // Update the backend with the bio-to-username change
            const updatedProfile = {
              ...userProfile,
              username: newUsername,
            };

            await fetch("http://localhost:9090/profile/update", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedProfile),
            });

            console.log("Username updated in backend from bio.");
            return;
          }
        }

        // If profile is found, set bio and profile image
        if (userProfile) {
          setBio(userProfile.bio?.trim() || DEFAULT_BIO);

          // Only update the profile image if it exists
          if (userProfile.profileImage) {
            const imageUrl = `data:image/jpeg;base64,${userProfile.profileImage}`;
            setProfileImage(imageUrl);
          }
        } else {
          // Clear profile data if no profile is found
          setUsername("");
          setBio(DEFAULT_BIO);
          setProfileImage(DEFAULT_IMAGE);
          console.warn("User not found by username or bio, using defaults.");
        }
      } catch (error) {
        console.error("Error fetching or updating profile:", error);
      }
    };

    fetchAndUpdateProfile(); // Always fetch the latest profile on mount or re-render
  }, []); // The empty array ensures that the effect runs only once when the component mounts

  const handleNavigate = (route) => {
    if (route === "posts") {
      navigate("/posts"); // Use navigate to go to the /posts route
    } else if (route === "events") {
      navigate("/events-registered"); // Navigate to EventsRegisterByPerson route
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left">
        <h1>{username}</h1>
        <p>{bio}</p>

        {/* Buttons below the bio */}
        <div className="profile-buttons">
          <button onClick={() => handleNavigate("posts")} className="profile-button">
            Posts
          </button>
          <button onClick={() => handleNavigate("events")} className="profile-button">
            Events Register
          </button>
        </div>
      </div>

      <div className="profile-right">
        {/* Display the profile image */}
        <img src={profileImage} alt="Profile" />
      </div>
    </div>
  );
};

export default Profile;
