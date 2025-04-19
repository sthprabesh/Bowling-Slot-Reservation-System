import React from 'react';
import '../styles/Dashboard.css'; // Import updated styles
import { useNavigate } from 'react-router-dom'; // For navigation

const Dashboard = () => {
  const navigate = useNavigate(); // Handle navigation

  return (
    <div className="dashboard">
      {/* Sidebar Section */}
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate('/dashboard/account-info')}>Account Information</li>
          <li onClick={() => navigate('/dashboard/booking-history')}>Booking History</li>
          <li onClick={() => navigate('/dashboard/my-reservation')}>My Reservation</li>
          <li onClick={() => navigate('/dashboard/logout')}>Logout</li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h1>Welcome to BOWL-ME!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
