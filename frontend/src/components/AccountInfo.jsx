import React, { useState, useEffect } from 'react';
import '../styles/AccountInfo.css'; // Importing styles specific to this component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert('Session expired or user not logged in. Redirecting to login page.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (!user) {
    return <p>No user information found.</p>;
  }

  return (
    <div className="account-info">
      <h1>Account Information</h1>
      <div className="info-section">
        <p><strong>Full Name:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
        <p><strong>Membership:</strong> {user.membership || 'Standard'}</p>
      </div>
    </div>
  );
};

export default AccountInfo;
