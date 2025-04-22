const express = require('express');
const pool = require('../db');
const router = express.Router();

// Sign-Up Route
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

router.post('/signup', async (req, res) => {
    const { fullname, phone_number, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds
        const result = await pool.query(
            'INSERT INTO users (fullname, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [fullname, phone_number, email, hashedPassword] // Store hashed password
        );
        res.status(201).json({ message: 'User created successfully', userId: result.rows[0].id });
    } catch (error) {
        // Handle unique constraint violations
        if (error.code === '23505') {// PostgreSQL error code for unique violation
            if (error.constraint === 'unique_phone_number') {
                res.status(400).json({ error: 'Phone number is already registered.' });
            } else if (error.constraint === 'unique_email') {
                res.status(400).json({ error: 'Email is already registered.' });
            } else {
                res.status(400).json({ error: 'Duplicate entry detected.' });
            }
        } else {
            console.error('Sign-up error:', error.message);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});


// Login Route
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body; // Allows either email or phone_number
    try {
        const result = await pool.query(
            'SELECT id, password FROM users WHERE (LOWER(email) = LOWER($1) OR phone_number = $1)',
            [emailOrPhone]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials or user does not exist.' });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password); // Compare hashed password
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Logged in successfully', userId: result.rows[0].id });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

// Logout Route
router.post('/logout', async (req, res) => {
    try {
        // Destroy session properly
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ error: 'Error logging out' });
            }

            res.status(200).json({ message: 'User logged out successfully' });
        });
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ error: 'Unexpected error logging out' });
    }
});


router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT fullname, phone_number, email FROM users WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(result.rows[0]); // Respond with user details
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

module.exports = router;