import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <div>
        <p>&copy; Faith's Lodge</p>
      </div>
      <div className="footerNav">
        <Link className="footerLink" to="/home">
          Home
        </Link>
        <Link className="footerLink" to="/about">
          About
        </Link>
        <Link className="footerLink" to="/info">
          Info
        </Link>
        <Link className="footerLink" to="/team">
          Team
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
