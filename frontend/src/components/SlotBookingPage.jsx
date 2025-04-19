import React, { useState } from 'react';
import '../styles/SlotBooking.css'; // Import custom styles
import axios from 'axios'; // Import Axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SlotBookingPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lanes, setLanes] = useState(1);
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for submit button

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId'); // Ensure the user is logged in
    setLoading(true); // Start loading spinner
    try {
      // Make a POST request to the booking API
      const response = await axios.post('http://localhost:5000/booking/book', {
        user_id: userId,
        date,
        time,
        lanes,
        duration,
      });
      console.log('Booking response:', response.data);
      alert(`Slot booked successfully!\nDate: ${date}\nTime: ${time}\nLanes: ${lanes}\nDuration: ${duration} hour(s)`);
      navigate('/dashboard'); // Redirect to Dashboard page
    } catch (error) {
      console.error('Error booking slot:', error.response?.data || error.message);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="slot-booking-page">
      {/* Booking Details Section */}
        <h2>Book your Bowling Slot</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Select Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} required
            />
          </label>
          <br />
          <label>
            Select Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Number of Lanes:
            <input
              type="number"
              value={lanes}
              onChange={(e) => setLanes(e.target.value)}
              min="1"
              max="5"
              required
            />
          </label>
          <br />
          <label>
            Duration (hours):
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5].map((hour) => (
                <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
  );
};

export default SlotBookingPage;
