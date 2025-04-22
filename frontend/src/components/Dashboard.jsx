import React from 'react';
import '../styles/Dashboard.css'; // Import updated styles
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardRoot = location.pathname === '/dashboard';

  return (
    <div className="dashboard">
      {/* Sidebar Section */}
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate('/dashboard/account-info')}>Account Information</li>
          <li onClick={() => navigate('/dashboard/booking-history')}>Booking History</li>
          <li onClick={() => navigate('/book-slot')}>Book a Slot</li>
          <li onClick={() => navigate('/dashboard/my-reservation')}>My Reservation</li>
          <li onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>Logout</li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className={`main-content ${isDashboardRoot ? 'center' : 'top'}`}>
        <h1>Welcome to BOWL-ME!</h1>
        {!isDashboardRoot && <Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
