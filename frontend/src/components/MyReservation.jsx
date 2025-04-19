import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:5000/dashboard/current-reservations/${userId}`)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  const handleEdit = (id) => {
    // Add functionality to edit reservation
    console.log(`Editing reservation ${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/dashboard/current-reservations/${id}`)
      .then(() => {
        setReservations(reservations.filter(reservation => reservation.id !== id));
      })
      .catch(error => {
        console.error('Error deleting reservation:', error);
      });
  };

  return (
    <div className="my-reservation">
      <h2>My Reservations</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p><strong>Date:</strong> {reservation.date}</p>
            <p><strong>Time:</strong> {reservation.time}</p>
            <p><strong>Lanes:</strong> {reservation.lanes}</p>
            <button onClick={() => handleEdit(reservation.id)}>Edit</button>
            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReservation;
