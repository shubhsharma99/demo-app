CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password)
SELECT 'test@example.com', 'password123'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'test@example.com' AND password = 'password123'
);

