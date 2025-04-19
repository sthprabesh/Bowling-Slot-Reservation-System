import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginSignupPage from './components/LoginSignupPage';
import SlotBookingPage from './components/SlotBookingPage';
import Dashboard from './components/Dashboard'; // Main Dashboard Component
import AccountInfo from './components/AccountInfo';
import BookingHistory from './components/BookingHistory';
import MyReservation from './components/MyReservation';
import Logout from './components/Logout';

const MainPageContent = () => {
  const navigate = useNavigate();

  const handleBookSlot = () => {
    navigate('/login'); // Redirect to the LoginSignupPage
  };

  return (
    <div className="main-page">
      <div className="hero-section">
        <h1 className="title">BOWL-ME</h1>
        <p className="subtitle">Welcome to Bowl-Me!</p>
        <p className="description">
          Your one-stop platform to easily book bowling slots and enjoy the game, hassle-free. 🎳 Let's get rolling!
        </p>
        <button className="cta-button" onClick={handleBookSlot}>
          Book a Slot
        </button>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageContent />} /> {/* Main Page */}
        <Route path="/login" element={<LoginSignupPage />} /> {/* Login/Signup Page */}
        <Route path="/book-slot" element={<SlotBookingPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="account-info" element={<AccountInfo />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="my-reservation" element={<MyReservation />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default App;
