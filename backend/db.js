const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost', // Assuming local setup
    database: 'postgres', // Your database name
    password: '12345', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;
