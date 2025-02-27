import React from "react";
import "../styles/Portfolios.css";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      {/* Portfolio Header */}
      <div className="portfolio-header">
        <div className="avatar-img-wrapper">
          <img
            src="https://via.placeholder.com/150"
            alt="Athlete Avatar"
            className="avatar-img"
          />
        </div>
        <div className="athlete-info">
          <h1>John Doe</h1>
          <p>Professional Soccer Player | Midfielder</p>
        </div>
      </div>

      {/* About Me Section */}
      <section>
        <h2>About Me</h2>
        <p>
          I am a passionate soccer player with over 10 years of experience
          playing at the highest levels. I have a strong work ethic and a drive
          for success. I am currently seeking new opportunities to take my career
          to the next level.
        </p>
      </section>

      {/* Stats Section */}
      <section>
        <h2>Stats</h2>
        <ul>
          <li>Games Played: 120</li>
          <li>Goals: 45</li>
          <li>Assists: 30</li>
          <li>Red Cards: 2</li>
        </ul>
      </section>

      {/* Media Gallery Section */}
      <section>
        <h2>Media Gallery</h2>
        <div className="media-grid">
          <div className="media-item">
            <img
              src="https://via.placeholder.com/320x180"
              alt="Game Moment"
            />
          </div>
          <div className="media-item">
            <img
              src="https://via.placeholder.com/320x180"
              alt="Training"
            />
          </div>
          <div className="media-item">
            <img
              src="https://via.placeholder.com/320x180"
              alt="Celebration"
            />
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section>
        <h2>Performance Metrics</h2>
        <div className="metrics">
          <div className="metric">
            <h3>Speed</h3>
            <p>Top Speed: 25 mph</p>
          </div>
          <div className="metric">
            <h3>Stamina</h3>
            <p>Average Running Distance: 8 miles per game</p>
          </div>
          <div className="metric">
            <h3>Strength</h3>
            <p>Squat: 250 lbs</p>
          </div>
        </div>
      </section>

      {/* Call to Action (Contact or Recruiter Info) */}
      <section>
        <h2>Contact</h2>
        <p>If you're interested in my profile or want to get in touch, feel free to reach out!</p>
        <button className="header_signup">Contact Me</button>
      </section>
    </div>
  );
};

export default Portfolio;
