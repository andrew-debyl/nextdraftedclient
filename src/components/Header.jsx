import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-white.svg";
import "../styles/Header.css";

function Header() {
  const nagivate = useNavigate();
  const [username, setUsername] = useState('') 

  const logout = async (e) => {
    e.preventDefault();
    let logout_url = "http://127.0.0.1:8000/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
  },[])

  return (
    <header className="header">
      <div className="header_container">
        {sessionStorage.getItem("username") ? (
          <div className="header_wrapper">
            <div className="header_logo-wrapper">
              <Link to="/">
                <img src={logo} alt="header_logo" />
              </Link>
            </div>
            <ul className="header_menu">
              <li>
                <Link to={`/portfolios/${username}`} className="header_item">
                  PORTFOLIOS
                </Link>
              </li>
              <li>
                <Link to="/" className="header_item">
                  RECRUITERS
                </Link>
              </li>
              <li>
                <Link to="/about" className="header_item">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to={`/profile/${username}`} className="header_item">
                  PROFILE
                </Link>
              </li>
              <li>
                <button onClick={logout} className="header_login">
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="header_wrapper">
            <div className="header_logo-wrapper">
              <Link to="/">
                <img src={logo} alt="header_logo" />
              </Link>
            </div>
            <ul className="header_menu">
              <li>
                <Link to="/portfolios" className="header_item">
                  PORTFOLIOS
                </Link>
              </li>
              <li>
                <Link to="/" className="header_item">
                  RECRUITERS
                </Link>
              </li>
              <li>
                <Link to="/about" className="header_item">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/login" className="header_login">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/signup" className="header_signup">
                  SIGN UP
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
