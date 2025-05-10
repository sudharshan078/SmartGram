// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import "../styles/Register.css";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
//   const [enteredRandomNumber, setEnteredRandomNumber] = useState(""); // State for entered random number
//   const [error, setError] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false); // New state to track registration status
//   const navigate = useNavigate();

//   // Function to generate a random number between 1000 and 9999
//   function generateRandomNumber() {
//     return Math.floor(Math.random() * 9000) + 1000;
//   }

//   // Handle submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !name || !email || !password || !enteredRandomNumber) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (enteredRandomNumber !== randomNumber.toString()) {
//       setError("The random number you entered is incorrect.");
//       return;
//     }

//     try {
//       const userData = {
//         username,
//         name,
//         email,
//         password,
//       };

//       // Submit the user data to the API
//       const response = await fetch("http://localhost:9090/api/user/post", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to register user");
//       }

//       // After successful registration, set isRegistered to true
//       setIsRegistered(true);
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   // Change random number on form load or each time it re-renders
//   useEffect(() => {
//     setRandomNumber(generateRandomNumber());
//   }, []);

//   // Redirect to login after successful registration
//   useEffect(() => {
//     if (isRegistered) {
//       // Navigate to login page
//       navigate("/login");
//     }
//   }, [isRegistered, navigate]);

//   return (
//     <div className="container">
//       {/* Left Side: Register Form */}
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="left-panel"
//       >
//         <form className="form-container" onSubmit={handleSubmit}>
//           <h2 className="form-title">Create an Account</h2>
//           {error && <p className="error-message">{error}</p>}

//           <div className="input-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <label>Random Number:</label>
//             <input
//               type="text"
//               value={randomNumber}
//               readOnly
//               className="random-number"
//             />
//           </div>

//           <div className="input-group">
//             <label>Enter Random Number:</label>
//             <input
//               type="text"
//               value={enteredRandomNumber}
//               onChange={(e) => setEnteredRandomNumber(e.target.value)}
//             />
//           </div>

//           <button type="submit" className="submit-button">
//             Register
//           </button>
//         </form>
//       </motion.div>

//       {/* Right Side: Description */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="right-panel"
//       >
//         <h1>Join SmartGram</h1>
//         <p>
//           Be a part of our vibrant social network. Create your profile,
//           share your stories, and connect with people who matter.
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [enteredRandomNumber, setEnteredRandomNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function generateRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !name || !email || !password || !enteredRandomNumber) {
      setError("Please fill in all fields.");
      return;
    }

    if (enteredRandomNumber !== randomNumber.toString()) {
      setError("The random number you entered is incorrect.");
      return;
    }

    try {
      const userData = {
        username,
        name,
        email,
        password,
      };

      const response = await fetch("http://localhost:9090/api/user/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // Navigate to login after successful registration
      navigate("/");

    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    setRandomNumber(generateRandomNumber());
  }, []);

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="left-panel"
      >
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Create an Account</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Random Number:</label>
            <input
              type="text"
              value={randomNumber}
              readOnly
              className="random-number"
            />
          </div>

          <div className="input-group">
            <label>Enter Random Number:</label>
            <input
              type="text"
              value={enteredRandomNumber}
              onChange={(e) => setEnteredRandomNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="right-panel"
      >
        <h1>Join SmartGram</h1>
        <p>
          Be a part of our vibrant social network. Create your profile,
          share your stories, and connect with people who matter.
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
