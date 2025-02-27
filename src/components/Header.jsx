import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-white.svg";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_wrapper">
          <div className="header_logo-wrapper">
            <Link to="/">
              <img src={logo} alt="header_logo" />
            </Link>
          </div>
          <ul className="header_menu">
            <li>
              <Link to="/portfolios"  className="header_item">PORTFOLIOS</Link>
            </li>
            <li>
              <Link to="/"  className="header_item">RECRUITERS</Link>
            </li>
            <li>
              <Link to="/about"  className="header_item">ABOUT</Link>
            </li>
            <li>
              <Link to="/"  className="header_item">USER PROFILE</Link>
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
      </div>
    </header>
  );
}

export default Header;