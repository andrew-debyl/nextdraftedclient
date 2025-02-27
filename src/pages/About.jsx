import React from "react";
import "../styles/About.css"

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Your Ultimate Athlete Portfolio</p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to provide athletes with the most comprehensive and
          customizable platform to build their athletic portfolio. Our platform
          is designed to help athletes stand out, track their progress, and
          connect with recruiters and coaches.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>
            Fully customizable athlete profiles to showcase your unique
            strengths.
          </li>
          <li>Easy-to-use video and stat upload tools.</li>
          <li>Direct communication with recruiters and coaches.</li>
          <li>
            Performance tracking with detailed insights and growth metrics.
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Our team is made up of passionate sports enthusiasts who understand
          the challenges athletes face when trying to get noticed. We've built
          this platform to help athletes at all levels—whether you're in high
          school or aiming for the pros—achieve your dreams.
        </p>
      </div>

      <div className="about-footer">
        <p>
          Want to learn more? <a href="/contact">Contact us</a>
        </p>
      </div>
    </div>
  );
}

export default About;
