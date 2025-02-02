const mysql = require('mysql2/promise');

// Create a connection pool
const db = mysql.createPool({
    host: 'localhost',          // Replace with your host
    user: 'root',               // Replace with your MySQL username
    password: 'yourpassword',   // Replace with your MySQL password
    database: 'feedback', // Replace with your database name
});

module.exports = db;
