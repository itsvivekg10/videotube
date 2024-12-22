import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png"; // Adjust path as necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake authentication check
    if (email === "user@example.com" && password === "password") {
      setMessage("Login successful!");
    } else {
      setMessage("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
