import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your backend API call
    const data={email,password}
    if (email === email && password === password) {
      localStorage.setItem('role', 'user');
      navigate('/user/dashboard',{ state: { email } });
    } else {
      setMessage('Invalid credentials');
    }
    axios.post('http://localhost:4000/login',data).then((response)=>{
      if(response.data.success){
      }

    })

  };

  return (
    <div className="center-align">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default Login;
