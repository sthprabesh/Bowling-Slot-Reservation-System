const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/book', async (req, res) => {
    const { user_id, date, time, lanes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, date, time, lanes) VALUES ($1, $2, $3, $4) RETURNING id',
            [user_id, date, time, lanes]
        );
        res.status(201).json({ message: 'Booking created successfully', bookingId: result.rows[0].id });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error creating booking' });
    }
});

module.exports = router;
