import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const login_url = "http://127.0.0.1:8000/login";

  const login = async (e) => {
    e.preventDefault();
  
    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const json = await res.json();

    if (json.status && json.status === "Authenticated") {
      sessionStorage.setItem("username", json.username);
      sessionStorage.setItem("userType", json.userType);
      alert("Successfully logged in");
      navigate('/') // Replace '/dashboard' with the correct path
      window.location.reload();
    } else {
      alert("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={login}>
          <div className="login-field">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account?&nbsp;
            <Link to="/signup" className="login-link">
              Sign Up
            </Link>
          </p>
          <div className="login-forgot-wrapper">
            <Link to="/forgotpass" className="login-forgot-pass">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
