const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

// Import database connection
const pool = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON requests

// Test database connection
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1');
        res.status(200).json({ message: 'Database connected successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error connecting to database' });
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Bowling Registration System API is running');
});

// Authentication and Booking Routes
app.use('/auth', authRoutes); // Handles signup and login
app.use('/booking', bookingRoutes); // Handles slot booking
const logoutRoutes = require('./routes/logout'); // Import logout route
app.use('/auth', authRoutes);
app.use('/auth', logoutRoutes); // Include the logout endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



