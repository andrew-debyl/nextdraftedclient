import React from "react";
import "../styles/Home.css"

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Elevate Your Game</h1>
          <p>
            Build your athlete portfolio, connect with recruiters, and take your
            career to the next level.
          </p>
          <a href="/signup" className="cta-button">
            Get Started
          </a>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Customizable Profiles</h3>
            <p>
              Create a profile that showcases your strengths and unique
              abilities.
            </p>
          </div>
          <div className="feature">
            <h3>Track Your Progress</h3>
            <p>
              Monitor your growth with stats, video analysis, and performance
              insights.
            </p>
          </div>
          <div className="feature">
            <h3>Connect with Recruiters</h3>
            <p>
              Send your portfolio directly to coaches and recruiters to stand
              out.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <h2>What Athletes Are Saying</h2>
        <div className="testimonial">
          <p>
            "This platform helped me get recruited by a top college team! I
            could easily show my highlights and track my progress. Highly
            recommended!"
          </p>
          <span>- Alex P., Soccer Player</span>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2025 AthleteHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
