// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import "../styles/Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem("isAuthenticated");
//     if (isAuthenticated === "true") {
//       navigate("/dashboard"); // Route to /dashboard instead of /body
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError("Please enter both username and password.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:9090/api/user/all", {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error("API endpoint not found");
//         } else if (response.status === 500) {
//           throw new Error("Server error occurred");
//         } else {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//       }

//       const users = await response.json();
//       const userExists = users.some(
//         (user) => user.username === username && user.password === password
//       );

//       if (userExists) {
//         localStorage.setItem("isAuthenticated", "true");
//         navigate("/dashboard"); // Updated to navigate to /dashboard
//       } else {
//         setError("Invalid username or password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError(`Connection error: ${error.message}. Please try again later.`);
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Left Side: Login Form */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="login-left"
//       >
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2>Login to SmartGram</h2>
//           {error && <p className="error">{error}</p>}

//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>

//           <div className="register-link">
//             Don't have an account?{" "}
//             <Link to="/register">Register here</Link>
//           </div>
//         </form>
//       </motion.div>

//       {/* Right Side: Description */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="login-right"
//       >
//         <h1>Welcome to SmartGram</h1>
//         <ul>
//           <li>SmartGram is a modern social media platform designed for seamless connection and smart sharing.</li>
//           <li>Users can create profiles, post images or videos, and interact through likes, comments, and messages.</li>
//           <li>It features a real-time chat system and a personalized feed based on user interests.</li>
//           <li>SmartGram emphasizes privacy and smooth user experience with a clean, responsive interface.</li>
//           <li>The platform uses intelligent suggestions to recommend friends and trending content.</li>
//           <li>With its smart features and user-friendly design, SmartGram redefines how we socialize online.</li>
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/user/all", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("API endpoint not found");
        } else if (response.status === 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const users = await response.json();
      const userExists = users.some(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", "Samrat"); // ✅ hardcoded as requested
        localStorage.setItem("justLoggedIn", "true"); // ✅ enables welcome message
        navigate("/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(`Connection error: ${error.message}. Please try again later.`);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="login-left"
      >
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to SmartGram</h2>
          {error && <p className="error">{error}</p>}

          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </motion.div>

      {/* Right Side: Description */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="login-right"
      >
        <h1>Welcome to SmartGram</h1>
        <ul>
          <li>SmartGram is a modern social media platform designed for seamless connection and smart sharing.</li>
          <li>Users can create profiles, post images or videos, and interact through likes, comments, and messages.</li>
          <li>It features a real-time chat system and a personalized feed based on user interests.</li>
          <li>SmartGram emphasizes privacy and smooth user experience with a clean, responsive interface.</li>
          <li>The platform uses intelligent suggestions to recommend friends and trending content.</li>
          <li>With its smart features and user-friendly design, SmartGram redefines how we socialize online.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Login;
