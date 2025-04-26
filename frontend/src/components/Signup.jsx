import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; 


const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ❌ was `e.priventDefault()` – fixed

    try {
      const res = await fetch('http://localhost:5555/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ❌ was `content-Type` and in wrong format
        },
        body: JSON.stringify(form), // ❌ was `JSON.Stringify` – fixed
      });

      const data = await res.json();
      if (res.ok) {
        setMsg('Signup successful! Now you can log in.');
      } else {
        setMsg(data.error || 'Signup failed.');
      }
    } catch (error) {
      setMsg('Something went wrong!');
      console.error(error); // Helpful for debugging
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
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
        <button type="submit">Sign up</button>
        <br />
         <p>Already have an account? <Link to="/">Login here</Link></p>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Signup;
