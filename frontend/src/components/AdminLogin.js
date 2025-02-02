import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Predefined credentials for admin
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('role', 'admin');
      navigate('/admin/dashboard');
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="center-align">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
