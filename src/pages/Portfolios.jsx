import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Portfolios.css";
import tempPhoto from "../assets/tempPhoto.png";

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const { username } = useParams();
  const loggedInUser = sessionStorage.getItem("username");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPortfolioTitle, setNewPortfolioTitle] = useState("");

  let portfolios_url = `http://127.0.0.1:8000/portfolios/${username}`;
  let add_portfolios_url = `http://127.0.0.1:8000/portfolios/add/${username}`;

  const get_portfolios = async () => {
    const res = await fetch(portfolios_url, {
      method: "GET",
    });

    const retobj = await res.json();

    if (retobj.portfolios) {
      setPortfolios(retobj.portfolios);
      setFirstName(retobj.first_name);
      setLastName(retobj.last_name);
      setAthleteId(retobj.id);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPortfolioTitle("");
  };

  const handleTitleChange = (event) => {
    setNewPortfolioTitle(event.target.value);
  };

  const addPortfolio = async () => {
    if (newPortfolioTitle.trim()) {
      const newPortfolioData = {
        athlete: athleteId,
        title: newPortfolioTitle,
      };

      try {
        const res = await fetch(add_portfolios_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPortfolioData),
        });

        if (res.ok) {
          closeModal();
          get_portfolios();
        } else {
          console.error("Failed to add portfolio:", await res.json());
        }
      } catch (error) {
        console.error("Error adding portfolio:", error);
      }
    } else {
      alert("Title cannot be blank");
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
            <button className="portfolios-heading-btn" onClick={openModal}>
              ADD PORTFOLIO
            </button>
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
                    src={
                      portfolio.portfolio_image
                        ? `http://127.0.0.1:8000${portfolio.portfolio_image}`
                        : tempPhoto
                    }
                    alt={portfolio.title}
                    className="portfolios-img"
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <div className="portfolios-modal-overlay">
          <div className="portfolios-modal">
            <h3 className="portfolios-modal-title">Add New Portfolio</h3>
            <div className="portfolios-modal-content">
              <input
                type="text"
                placeholder="Portfolio Title"
                value={newPortfolioTitle}
                onChange={handleTitleChange}
                className="portfolios-modal-input"
              />
            </div>
            <div className="portfolios-modal-actions">
              <button
                onClick={addPortfolio}
                className="portfolios-modal-save-button"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="portfolios-modal-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
