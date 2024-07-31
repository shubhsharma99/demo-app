const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');

  // Initialize the database
  const initDbQuery = `
    CREATE DATABASE IF NOT EXISTS mydatabase;
    USE mydatabase;
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    INSERT IGNORE INTO users (email, password) VALUES ('test@example.com', 'password123');
  `;

  db.query(initDbQuery, (err, results) => {
    if (err) {
      console.error('Database initialization failed:', err.stack);
      return;
    }
    console.log('Database initialized');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
