import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PharmacyLocator from './components/PharmacyLocator';
import OrderTracker from './components/OrderTracker';
import "./App.css"; // Link your CSS file
import UserProfile from './components/UserProfile';
import Footer from './components/Footer'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <div className="burger-menu" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </div>

        <nav className={`navigation ${isMenuOpen ? "show" : ""}`}>
  <ul>
    <li>
      <NavLink to="/" className="nav-link">Login</NavLink>
    </li>
    <li>
      <NavLink to="/signup" className="nav-link">Signup</NavLink>
    </li>
    <li>
    <NavLink to="/profile" className="nav-link">Profile</NavLink>
    </li>
    <li>
      <NavLink to="/pharmacy-locator" className="nav-link">Pharmacy Locator</NavLink>
    </li>
    <li>
      <NavLink to="/order-tracker" className="nav-link">Order Tracker</NavLink>
    </li>
  </ul>
  {/* Company Name */}
  <div className="company-name">HypernovaHealth 💊</div>
</nav>




        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pharmacy-locator" element={<PharmacyLocator />} />
          <Route path="/order-tracker" element={<OrderTracker />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




