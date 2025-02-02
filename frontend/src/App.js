import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
import './App.css';

function HomePage() {
  return (
      <div className="HomePage dashboard"> {/* Apply the HomePage and dashboard classes here */}
      <h1>Welcome to BookMyShoes</h1>
      <nav>
        <ul>
          <li><div className="box"><Link to="/register">Register</Link></div></li>
          <li><div className="box"><Link to="/login">Login</Link></div></li>
          <li><div className="box"><Link to="/admin/login">Admin Login</Link></div></li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
