import React, { useState } from "react";
import "../styles/ForgotPass.css"

function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    
  };
  return (
    <div className="forgotpass-container">
      <div className="forgotpass-form">
        <h2 className="forgotpass-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="forgotpass-field">
            <label htmlFor="email" className="forgotpass-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="forgotpass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgotpass-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
