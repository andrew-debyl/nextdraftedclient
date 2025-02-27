import React, { useState } from "react";
import "../styles/SignUp.css"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add signup logic here (e.g., API call to create user)
    if (password === confirmPassword) {
      console.log("User signed up with:", { email, password });
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="signup-field">
            <label htmlFor="email" className="signup-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-field">
            <label htmlFor="password" className="signup-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-field">
            <label htmlFor="confirmPassword" className="signup-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-submit">
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <a href="/login" className="signup-link">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
