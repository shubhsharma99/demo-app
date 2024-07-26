const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'myapp'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('Invalid credentials');
    
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (result) {
        res.status(200).send('Login successful');
      } else {
        res.status(400).send('Invalid credentials');
      }
    });
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Server error');
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
      if (err) return res.status(500).send('Server error');
      res.status(201).send('User registered');
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
