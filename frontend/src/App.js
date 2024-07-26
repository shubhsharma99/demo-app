import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert(error.response.data);
      });
  };

  const handleRegister = () => {
    axios.post('http://localhost:5000/register', { username, password })
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default App;
