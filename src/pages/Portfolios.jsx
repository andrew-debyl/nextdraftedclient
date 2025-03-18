import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Portfolios.css";
import tempPhoto from '../assets/tempPhoto.png'

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { username } = useParams();
  const loggedInUser = sessionStorage.getItem("username");

  let portfolios_url = `http://127.0.0.1:8000/portfolios/${username}`;

  const get_portfolios = async () => {
    const res = await fetch(portfolios_url, {
      method: "GET",
    });

    const retobj = await res.json();
    if (retobj.portfolios) {
      setPortfolios(retobj.portfolios);
      setFirstName(retobj.first_name);
      setLastName(retobj.last_name);
    }
  };

  useEffect(() => {
    get_portfolios();
  }, []);

  return (
    <div className="portfolios">
      <div className="portfolios-heading-wrapper">
        <h2 className="portfolios-heading-title">
          {firstName} {lastName}'s Portfolios
        </h2>
        {loggedInUser === username && (
          <div>
            <button className="portfolios-heading-btn">ADD PORTFOLIO</button>
          </div>
        )}
      </div>
      <div className="portfolios-container">
        {portfolios &&
          portfolios.map((portfolio) => (
            <div key={portfolio.id} style={{ position: "relative" }}>
              <Link
                to={`/portfolios/${username}/${portfolio.id}`}
                className="portfolios-portfolio"
              >
                <div className="portfolios-text">
                  <h3 className="portfolios-title">{portfolio.title}</h3>
                  <p className="portfolios-subtitle">
                    <strong>Sport:</strong> {portfolio.sport}
                  </p>
                  <p className="portfolios-subtitle">
                    <strong>Team:</strong> {portfolio.team}
                  </p>
                  <p className="portfolios-subtitle">
                    <strong>Position:</strong> {portfolio.position}
                  </p>
                </div>
                <div className="portfolios-img-wrapper">
                  <img
                    src={portfolio.portfolio_image ? `http://127.0.0.1:8000${portfolio.portfolio_image}` : tempPhoto}
                    alt={portfolio.title}
                    className="portfolios-img"
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Portfolio;
