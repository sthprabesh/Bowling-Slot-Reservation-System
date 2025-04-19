import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/dashboard/account-info/${userId}`)
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  return (
    <div className="account-info">
      <h2>Account Information</h2>
      <p><strong>Full Name:</strong> {userInfo.fullname}</p>
      <p><strong>Phone Number:</strong> {userInfo.phone_number}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
    </div>
  );
};

export default AccountInfo;
