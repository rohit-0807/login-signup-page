import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({email:'',password:''});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5555/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMsg('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMsg(data.error || 'Login failed.');
      }
    } catch (err) {
      setMsg('Something went wrong!');
    }
  };

  return (
   <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
        <br />
        <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
};

export default Login;