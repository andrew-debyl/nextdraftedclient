import React from "react";

function Portfolios() {
  return (
    <div className="athlete-portfolio">
      <header>
        <div className="container">
          <h1>Athlete Portfolio</h1>
        </div>
      </header>
      <main className="container">
        <section className="profile">
          <div className="profile-image">
            <img src="placeholder-profile.jpg" alt="Athlete Profile" />
          </div>
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Sport: Basketball</p>
            <p>Position: Point Guard</p>
            <p>Location: City, State</p>
            <p>
              Bio: A dedicated basketball player with a passion for the game...
            </p>
          </div>
        </section>
        <section className="stats">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Points Per Game</h3>
              <p>22.5</p>
            </div>
            <div className="stat">
              <h3>Assists Per Game</h3>
              <p>6.8</p>
            </div>
            <div className="stat">
              <h3>Rebounds Per Game</h3>
              <p>4.2</p>
            </div>
            <div className="stat">
              <h3>3-Point Percentage</h3>
              <p>40%</p>
            </div>
          </div>
        </section>
        <section className="videos">
          <h2>Highlight Videos</h2>
          <div className="video-grid">
            <div className="video">
              <video src="placeholder-video1.mp4" controls />
              <p>Game Highlights - Season 2023</p>
            </div>
            <div className="video">
              <video src="placeholder-video2.mp4" controls />
              <p>Training Session - Dribbling Skills</p>
            </div>
          </div>
        </section>
        <section className="gallery">
          <h2>Photo Gallery</h2>
          <div className="image-grid">
            <img src="placeholder-image1.jpg" alt="Gallery Image 1" />
            <img src="placeholder-image2.jpg" alt="Gallery Image 2" />
            <img src="placeholder-image3.jpg" alt="Gallery Image 3" />
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 Athlete Portfolio</p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolios;
