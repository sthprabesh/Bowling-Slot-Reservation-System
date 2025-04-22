const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/book', async (req, res) => {
    const { user_id, date, time, lanes, duration } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, date, time, lanes, duration) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [user_id, date, time, lanes, duration]
        );
        res.status(201).json({ message: 'Booking created successfully', bookingId: result.rows[0].id });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error creating booking' });
    }
});

router.get('/bookings/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const now = new Date().toISOString().split("T")[0]; // Today's date (YYYY-MM-DD)

        const result = await pool.query(
            `SELECT 
                TO_CHAR(date, 'YYYY-MM-DD') AS date, 
                time, 
                lanes, 
                duration 
             FROM bookings 
             WHERE user_id = $1 AND date < $2 
             ORDER BY date DESC`,
            [userId, now] // Show only previous bookings
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No previous bookings found." });
        }

        res.status(200).json(result.rows); // Send filtered previous bookings
    } catch (error) {
        console.error("Error fetching booking history:", error.message);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});


router.get('/reservations/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const now = new Date().toISOString().split("T")[0];

        const result = await pool.query(
            `SELECT 
                id, 
                TO_CHAR(date, 'YYYY-MM-DD') AS date, 
                time, 
                lanes, 
                duration 
             FROM bookings 
             WHERE user_id = $1 AND date >= $2 
             ORDER BY date ASC`,
            [userId, now]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No upcoming reservations found." });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching reservations:", error.message);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

//Edit or Modify Reservations
router.put('/edit/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    const { date, time, lanes, duration } = req.body;

    try {
        // Get the current time
        const now = new Date();
        const UTCOffset = 3 * 60 * 60 * 1000; // Offset for Europe/Helsinki in milliseconds
        const localNow = new Date(now.getTime() + UTCOffset);

        // Calculate the 24-hour time limit
        const timeLimit = new Date(localNow.getTime() + 24 * 60 * 60 * 1000);

        // Get the booking details from the database
        const result = await pool.query(
            `SELECT 
                TO_CHAR(date, 'YYYY-MM-DD') AS date, 
                TO_CHAR(time, 'HH24:MI') AS time 
             FROM bookings 
             WHERE id = $1`, 
            [bookingId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        // Parse and adjust the booking date/time to local timezone
        const bookingDate = result.rows[0].date; // Formatted as YYYY-MM-DD
        const bookingTime = result.rows[0].time; // Formatted as HH:MM
        const bookingDateTime = new Date(`${bookingDate}T${bookingTime}:00`);
        const localBookingDateTime = new Date(bookingDateTime.getTime() + UTCOffset);

        // Debugging: Log adjusted times for validation
        console.log("Local Booking DateTime:", localBookingDateTime);
        console.log("Local Current Time:", localNow);
        console.log("24-hour Time Limit:", timeLimit);

        // Restrict edits if booking is within 24 hours
        if (localBookingDateTime < timeLimit) {
            return res.status(403).json({ error: "Cannot edit bookings less than 24 hours before the reservation." });
        }

        // If within allowed time, update the booking
        const updateQuery = `
            UPDATE bookings 
            SET date = $1, time = $2, lanes = $3, duration = $4 
            WHERE id = $5
            RETURNING id, TO_CHAR(date, 'YYYY-MM-DD') AS date, time, lanes, duration
        `;
        const updatedBooking = await pool.query(updateQuery, [date, time, lanes, duration, bookingId]);

        res.status(200).json(updatedBooking.rows[0]); // Return the updated booking details
    } catch (error) {
        console.error("Error updating booking:", error.message);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});



// Delete reservation
router.delete('/delete/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Check if booking exists and format date/time
        const result = await pool.query(
            `SELECT 
                TO_CHAR(date, 'YYYY-MM-DD') AS date, 
                TO_CHAR(time, 'HH24:MI') AS time 
             FROM bookings 
             WHERE id = $1`, 
            [bookingId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        // Parse the booking's date and time
        const bookingDate = result.rows[0].date; // Formatted as YYYY-MM-DD
        const bookingTime = result.rows[0].time; // Formatted as HH:MM
        const bookingDateTime = new Date(`${bookingDate}T${bookingTime}:00`);

        // Manually adjust timezone to Europe/Helsinki (UTC+3)
        const UTCOffset = 3 * 60 * 60 * 1000; // Offset in milliseconds
        const localBookingDateTime = new Date(bookingDateTime.getTime() + UTCOffset);
        const now = new Date();
        const localNow = new Date(now.getTime() + UTCOffset);

        // Debugging: Log adjusted values for validation
        console.log("Local Booking DateTime:", localBookingDateTime);
        console.log("Local Current Time:", localNow);

        // Calculate time difference
        const timeDifference = localBookingDateTime.getTime() - localNow.getTime();

        // Check if within 24 hours
        if (timeDifference <= 24 * 60 * 60 * 1000) {
            return res.status(403).json({ error: "Cannot delete bookings less than 24 hours before the reservation." });
        }

        // If valid, delete the booking
        await pool.query(`DELETE FROM bookings WHERE id = $1`, [bookingId]);

        res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        console.error("Error deleting booking:", error.message);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});







module.exports = router;
