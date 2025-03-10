import React, { useState } from "react";
import "../styles/SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      let register_url = "http://127.0.0.1:8000/signup";

      const res = await fetch(register_url, {
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
      if (json.status) {
        sessionStorage.setItem("username", json.username);

        let role_url = "http://127.0.0.1:8000/create_role";

        const roleData = {
          username: username,
          role: role,
        };

        const roleRes = await fetch(role_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roleData),
        });

        const roleJson = await roleRes.json();

        if (roleJson.status) {
          alert("Success!");
          window.location.href = window.location.origin;
        } else {
          alert("There was an issue creating your profile as a " + role);
        }
      } else if (json.error === "Already Registered") {
        alert("The user with same username is already registered");
        window.location.href = window.location.origin;
      }
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
            <label htmlFor="username" className="signup-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="signup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="role-selection">
            <button
              type="button"
              className={`role-button ath-margin ${
                role === "athlete" ? "active" : ""
              }`}
              onClick={() => handleRoleSelect("athlete")}
            >
              Athlete
            </button>
            <button
              type="button"
              className={`role-button rec-margin ${
                role === "recruiter" ? "active" : ""
              }`}
              onClick={() => handleRoleSelect("recruiter")}
            >
              Recruiter
            </button>
          </div>
          <button type="submit" className="signup-submit">
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <a href="/login" className="signup-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
