import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SlotBookingPage from './components/SlotBookingPage';
import LoginSignupPage from './components/LoginSignupPage';
import Dashboard from './components/Dashboard'; 
import AccountInfo from './components/AccountInfo';
import BookingHistory from './components/BookingHistory';
import MyReservation from './components/MyReservation';
import Logout from './components/Logout';

const MainPageContent = () => {
  const navigate = useNavigate();

  const handleBookSlot = () => {
    navigate('/login'); // Redirect to LoginSignupPage
  };

  return (
    <div className="main-page">
      <h1>BOWL-ME</h1>
      <h2><strong>Welcome to BOWL-ME!</strong></h2>
      <p>Your one-stop platform to easily book bowling slots and enjoy the game, hassle-free. Let's get rolling!</p>
      <button onClick={handleBookSlot}>Book a Slot</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageContent />} />
        <Route path="/book-slot" element={<SlotBookingPage />} />
        <Route path="/login" element={<LoginSignupPage />} />
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
