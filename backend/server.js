const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var session = require('express-session');
var nocache = require('nocache');

const app = express();
const port =4000;
const secretKey = 'your_secret_key'; // Replace with a strong secret key

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());

app.use(session({
    secret: 'key',
    resave: false, // Add this line
    saveUninitialized: false, // Add this line
    cookie: { maxAge: 1800000 }
}));
app.use(nocache())

// API to fetch all bus schedules
app.get('/api/ordering-schedules', (req, res) => {
    db.query('SELECT * FROM ordering', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching for order' });
        } else {
            res.status(200).json(result);
        }
    });
});

app.get('/api/ordering-bookings', (req, res) => {
    db.query('SELECT data.*,ordering.* FROM data INNER JOIN ordering ON data.order_id = ordering.id', (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching orders' });
        } else {
            res.status(200).json(result);
        }
    });
});

// API to add a new bus schedule
app.post('/api/ordering-schedules', (req, res) => {
    const { shoe_name,date,size} = req.body;
    const query = 'INSERT INTO ordering ( shoe_name,date,size) VALUES (?, ?, ?)';
    db.query(query, [ shoe_name,date,size], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding shoe' });
        } else {
            res.status(200).json({ message: 'shoe added successfully' });
        }
    });
});

// API to update bus schedule
app.put('/api/ordering-schedules/:id', (req, res) => {
    const {shoe_name,date,size } = req.body;
    const { id } = req.params;
    const query = 'UPDATE ordering SET shoe_name = ?, date = ?, size = ? WHERE id = ?';
    db.query(query, [ shoe_name,date,size,id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error updating shoe' });
        } else {
            res.status(200).json({ message: 'shoe updated successfully' });
        }
    });
});

app.post('/api/ordering-schedules', (req, res) => {
    const { shoe_name,date,size } = req.body;
    const query = 'INSERT INTO ordering ( shoe_name,date,size) VALUES (?, ?, ?)';
    db.query(query, [ shoe_name,date,size], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error updating shoe' });
        } else {
            res.status(200).json({ message: 'shoe added successfully' });
        }
    });
});

app.post('/api/order-shoe', function(req,res){
    // console.log(req.body);
    const{orderId,email} = req.body;
    // console.log(orderId);
    // console.log(email);
    
    
    const query = "INSERT INTO data (order_id,User_name) VALUES (? ,?)"
    db.query(query,[orderId,email],(err,result)=>{
        if(err){
            res.status(500).json({message:'Error ordering shoe'})
        }else{
            res.status(200).json({message:'Shoe ordered successfully'})
        }
    })
})

// API to delete bus schedule
app.delete('/api/ordering-schedules/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ordering WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting shoe ' });
        } else {
            res.status(200).json({ message: ' shoe deleted sucessfully'});
        }
        
    });
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default XAMPP username
    password: '', // Default XAMPP password
    database: 'booking',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Routes
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;



    
    // Check if the user already exists
    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserSql, [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) return res.status(400).send('User already exists.');

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('User registered successfully!');
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    req.session.email = email

const sql = 'SELECT * FROM users WHERE email = ?';
db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(400).send('User not found.');

    // Compare the hashed password
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) {
        return res.status(401).send('Invalid credentials.');
    }

    // Create a JWT token
    const token = jwt.sign({ userId: results[0].id }, secretKey, { expiresIn: '1h' });

    // Respond with a success message and the token
    res.status(200).json({
        message: 'Login successful!',
        token: token
    });
});
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
