import React, { useEffect, useState } from "react";
import "../styles/Portfolio.css";
import { useParams } from "react-router-dom";

function Portfolio() {
  const { username } = useParams();
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [statsData, setStatsData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [videoData, setVideoTemp] = useState([]);

  let portfolio_url = `http://127.0.0.1:8000/portfolios/${username}/${portfolioId}`;

  const get_portfolio = async () => {
    const res = await fetch(portfolio_url, {
      method: "GET",
    });

    const retobj = await res.json();
    if (retobj.portfolios) {
      setPortfolio(retobj.portfolios);
      setFirstName(retobj.first_name);
      setLastName(retobj.last_name);
      setStatsData(
        retobj.items
          .filter((item) => item.category === "stats")
          .sort((a, b) => a.order - b.order)
      );
      setMetricsData(
        retobj.items
          .filter((item) => item.category === "metrics")
          .sort((a, b) => a.order - b.order)
      );
      setImageData(
        retobj.items
          .filter((item) => item.category === "image")
          .sort((a, b) => a.order - b.order)
      );
      setVideoTemp(
        retobj.items
          .filter((item) => item.category === "video")
          .sort((a, b) => a.order - b.order)
      );
    }
  };

  useEffect(() => {
    get_portfolio();
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <div className="avatar-img-wrapper">
          <img
            src={`http://127.0.0.1:8000${portfolio.portfolio_image}`}
            alt="Athlete Avatar"
            className="avatar-img"
          />
        </div>
        <div className="athlete-info">
          <h1>
            {firstName} {lastName}
          </h1>
          <p>
            {portfolio.sport} | {portfolio.position}
          </p>
          <p>{portfolio.team}</p>
        </div>
      </div>
      <section>
        <h2>About Me</h2>
        <p>{portfolio.description}</p>
      </section>
      {statsData && (
        <section>
          <h2>Stats</h2>
          <ul>
            {statsData.map((item) => (
              <li key={item.id}>
                {item.title}: {item.data}
              </li>
            ))}
          </ul>
        </section>
      )}

      {metricsData && (
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
      )}

      <section>
        <h2>Media Gallery</h2>
        <div className="media-grid">
          <div className="media-item">
            <img src="https://via.placeholder.com/320x180" alt="Game Moment" />
          </div>
          <div className="media-item">
            <img src="https://via.placeholder.com/320x180" alt="Training" />
          </div>
          <div className="media-item">
            <img src="https://via.placeholder.com/320x180" alt="Celebration" />
          </div>
        </div>
      </section>

      {/* Call to Action (Contact or Recruiter Info) */}
      <section>
        <h2>Contact</h2>
        <p>
          If you're interested in my profile or want to get in touch, feel free
          to reach out!
        </p>
        <button className="header_signup">Contact Me</button>
      </section>
    </div>
  );
}

export default Portfolio;
