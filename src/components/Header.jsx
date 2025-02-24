import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div>
        <Link to="/">
          <img></img>
        </Link>
      </div>
      <ul>
        <Link to="/portfolio">
          <li>Portfolio</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/signup">
          <li>Sign Up</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;

//https://themeforest.net/item/footme-football-player-portfolio-html-templates/29506117