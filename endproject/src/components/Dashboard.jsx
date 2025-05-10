// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Navbar from "./Navbar";  // Assuming you have a Navbar component
// import DisplayImages from "./DisplayImages";  // Assuming you have a DisplayImages component
// import PostImage from "./PostImage";  // Make sure PostImage is correctly imported here

// const Dashboard = () => {
//   return (
//     <div>
//       <Navbar />
//       <div>
//         <h2>Welcome to the Dashboard</h2>
//         <nav>
//           <Link to="/dashboard"></Link>
//           <Link to="/dashboard/post"></Link>  {/* Link to PostImage */}
//         </nav>

//         <Routes>
//           <Route path="/" element={<DisplayImages />} />   {/* Default route for DisplayImages */}
//           <Route path="post" element={<PostImage />} />   {/* Nested route for PostImage */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import DisplayImages from "./DisplayImages";
import PostImage from "./PostImage";
import "../styles/Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false); // default is false
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser || "User");

    const justLoggedIn = localStorage.getItem("justLoggedIn");

    if (justLoggedIn === "true") {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
        localStorage.removeItem("justLoggedIn"); // Clear the flag after showing
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showWelcome) {
    return (
      <div className="welcome-container">
        <h1 className="welcome-text">Welcome to SmartGram, {username}!</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <h2>Welcome to the Dashboard</h2>
        <nav>
          <Link to="/dashboard">Home</Link> |{" "}
          <Link to="/dashboard/post">Post Image</Link>
        </nav>

        <Routes>
          <Route path="/" element={<DisplayImages />} />
          <Route path="post" element={<PostImage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
