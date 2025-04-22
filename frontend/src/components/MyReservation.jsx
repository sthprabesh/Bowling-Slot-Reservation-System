import React, { useState, useEffect } from 'react';
import '../styles/MyReservation.css';
import '../styles/CancellationPolicy.css';
import CancellationPolicy from './CancellationPolicy';

import axios from 'axios';

const MyReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editReservationId, setEditReservationId] = useState(null); 
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedTime, setUpdatedTime] = useState('');
    const [updatedLanes, setUpdatedLanes] = useState('');
    const [updatedDuration, setUpdatedDuration] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Session expired or user not logged in.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/booking/reservations/${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const handleEditClick = (reservation) => {
        setEditReservationId(reservation.id);
        setUpdatedDate(reservation.date);
        setUpdatedTime(reservation.time);
        setUpdatedLanes(reservation.lanes);
        setUpdatedDuration(reservation.duration);
    };

    const handleUpdateReservation = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/booking/edit/${editReservationId}`, {
                date: updatedDate,
                time: updatedTime,
                lanes: updatedLanes,
                duration: updatedDuration
            });

            setReservations(reservations.map(res =>
                res.id === response.data.id ? { ...res, date: response.data.date, time: response.data.time, lanes: response.data.lanes, duration: response.data.duration } : res
            ));

            setEditReservationId(null);
        } catch (error) {
            console.error("Error updating reservation:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Update failed!");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    
        try {
            const response = await axios.delete(`http://localhost:5000/booking/delete/${id}`);
            setReservations(reservations.filter(res => res.id !== id));
            alert(response.data.message); // Inform the user of successful deletion
        } catch (error) {
            console.error("Error deleting reservation:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Delete failed!");
        }
    };
    

    return (
        <div className="reservation-page">
            <div className="reservation-container">
                {/* Reservations Section */}
                <div className="my-reservation">
                    <h1>Upcoming Reservations</h1>

                    {loading ? (
                        <p>Loading reservations...</p>
                    ) : reservations.length === 0 ? (
                        <p>No upcoming reservations found.</p>
                    ) : (
                        <ul className="reservation-list">
                            {reservations.map((reservation) => (
                                <li key={reservation.id} className="reservation-item">
                                    {editReservationId === reservation.id ? (
                                        <div className="edit-form">
                                            <h2>Edit Reservation</h2>
                                            <label>Date:
                                                <input type="date" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} />
                                            </label>
                                            <label>Time:
                                                <input type="time" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} />
                                            </label>
                                            <label>Lanes:
                                                <input type="number" value={updatedLanes} onChange={(e) => setUpdatedLanes(e.target.value)} min="1" max="10" />
                                            </label>
                                            <label>Duration (hours):
                                                <input type="number" value={updatedDuration} onChange={(e) => setUpdatedDuration(e.target.value)} min="1" />
                                            </label>
                                            <button onClick={handleUpdateReservation}>Save Changes</button>
                                            <button onClick={() => setEditReservationId(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            <p><strong>Date:</strong> {reservation.date}</p>
                                            <p><strong>Time:</strong> {reservation.time}</p>
                                            <p><strong>Lanes:</strong> {reservation.lanes}</p>
                                            <p><strong>Duration:</strong> {reservation.duration} hour(s)</p>
                                            <button className="edit-button" onClick={() => handleEditClick(reservation)}>Edit</button>
                                            <button className="delete-button" onClick={() => handleDelete(reservation.id)}>Delete</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Cancellation Policy Side Panel */}
                    <CancellationPolicy />
            </div>
        </div>
    );
};

export default MyReservation;
