


// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import UpdateProfile from "./components/UpdateProfile";
// import Settings from "./components/Settings";
// import ExploreEvents from "./components/ExploreEvents";
// import EventRegister from "./components/EventRegister";
// import Posts from "./components/Posts"; // Import Posts component

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard/*" element={<Dashboard />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/update-profile" element={<UpdateProfile />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route path="/explore" element={<ExploreEvents />} />
//         <Route path="/event-register" element={<EventRegister />} />
//         <Route path="/posts" element={<Posts />} /> {/* Add route for /posts */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Settings from "./components/Settings";
import ExploreEvents from "./components/ExploreEvents";
import EventRegister from "./components/EventRegister";
import Posts from "./components/Posts"; // Import Posts component
import EventsRegisterByPerson from "./components/EventsRegisterByPerson"; // Import the EventsRegisterByPerson component
import Friends from "./components/Friends"; // Import the Friends component
import Contact from "./components/Contact"; // Import the Contact component
import About from "./components/About";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/explore" element={<ExploreEvents />} />
        <Route path="/event-register" element={<EventRegister />} />
        <Route path="/posts" element={<Posts />} /> {/* Add route for /posts */}
        <Route path="/events-registered" element={<EventsRegisterByPerson />} /> {/* Add route for EventsRegisterByPerson */}
        <Route path="/friends" element={<Friends />} /> {/* Add route for Friends */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
