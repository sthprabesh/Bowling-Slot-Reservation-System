const express = require('express');
const router = express.Router();

router.post('/logout', async (req, res) => {
    try {
        req.session = null; // using session-based authentication
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ error: 'An error occurred while logging out' });
    }
});

module.exports = router;
