import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/dashboard/booking-history/${userId}`)
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking history:', error);
      });
  }, []);

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      <ul>
        {history.map(booking => (
          <li key={booking.id}>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Lanes:</strong> {booking.lanes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
