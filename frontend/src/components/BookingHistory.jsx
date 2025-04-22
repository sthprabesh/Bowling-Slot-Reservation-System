import React, { useState, useEffect } from 'react';
import '../styles/BookingHistory.css'; // Importing styles specific to this component
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert('Session expired or user not logged in.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/booking/bookings/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error.response?.data || error.message);
        alert('Failed to fetch booking history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) {
    return <p>Loading booking history...</p>;
  }

  if (bookings.length === 0) {
    return <p>No booking history found.</p>;
  }

  return (
    <div className="booking-history">
      <h1>Your Booking History</h1>
      <ul className="history-list">
        {bookings.map((booking, index) => (
          <li key={index} className="history-item">
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Lanes:</strong> {booking.lanes}</p>
            <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
