import React, { useEffect, useState, useRef } from "react";
import "../styles/Portfolio.css";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faCamera,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import tempPhoto from "../assets/tempPhoto.png";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editablePortfolio, setEditablePortfolio] = useState({});
  const [editableStatsData, setEditableStatsData] = useState([]);
  const [editableMetricsData, setEditableMetricsData] = useState([]);
  const [editableImageData, setEditableImageData] = useState([]);
  const loggedInUser = sessionStorage.getItem("username");
  const fileInputRef = useRef(null);
  const photosInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [newImages, setNewImages] = useState([]);

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
      setEditableImageData(
        retobj.items
          .filter((item) => item.category === "image")
          .sort((a, b) => a.order - b.order)
      );
      setVideoTemp(
        retobj.items
          .filter((item) => item.category === "video")
          .sort((a, b) => a.order - b.order)
      );
      setEditablePortfolio({ ...retobj.portfolios });
      setEditableStatsData(
        retobj.items
          .filter((item) => item.category === "stats")
          .sort((a, b) => a.order - b.order)
          .map((item) => ({ ...item }))
      );
      setEditableMetricsData(
        retobj.items
          .filter((item) => item.category === "metrics")
          .sort((a, b) => a.order - b.order)
          .map((item) => ({ ...item }))
      );
    }
  };

  useEffect(() => {
    get_portfolio();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
console.log(imageData)
  const handleSaveClick = async () => {
    const updatedPortfolioData = { ...editablePortfolio };
    const formData = new FormData();

    Object.keys(updatedPortfolioData).forEach((key) => {
      if (key === "portfolio_image") {
        if (updatedPortfolioData[key] instanceof File) {
          formData.append(key, updatedPortfolioData[key]);
        } else {
          formData.append(key, null);
        }
      } else if (
        updatedPortfolioData[key] !== undefined &&
        updatedPortfolioData[key] !== null
      ) {
        formData.append(key, updatedPortfolioData[key]);
      }
    });

    try {
      await fetch(portfolio_url + "/update", {
        method: "PUT",
        body: formData,
      });

      const updatedStatsData = editableStatsData.map((item, index) => ({
        ...item,
        order: index, // Update order based on current position
        category: "stats",
      }));
      const updatedMetricsData = editableMetricsData.map((item, index) => ({
        ...item,
        order: index, // Update order based on current position
        category: "metrics",
      }));
      const updatedImageData = editableImageData.map((item, index) => ({
        ...item,
        order: index, // Update order based on current position
        category: "image",
      }));

      const allItems = [...updatedStatsData, ...updatedMetricsData];

      if (editableImageData) {
        await Promise.all(
          updatedImageData.map(async (item) => {
            await fetch(portfolio_url + `/items/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order: item.order }),
            });
          })
        );
      }

      await Promise.all(
        allItems.map(async (item) => {
          const itemUrl = item.id
            ? portfolio_url + `/items/${item.id}`
            : portfolio_url + `/items`;
          await fetch(itemUrl, {
            method: item.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        })
      );

      await Promise.all(
        newImages.map(async (file) => {
          const formData = new FormData();
          formData.append("sport_portfolio", portfolioId);
          formData.append("category", "image");
          formData.append("image", file);
          await fetch(portfolio_url + `/items`, {
            method: "POST",
            body: formData,
          });
        })
      );

      const statsToDelete = statsData
        .map((item) => item.id)
        .filter(
          (id) => !updatedStatsData.some((updatedItem) => updatedItem.id === id)
        );

      const metricsToDelete = metricsData
        .map((item) => item.id)
        .filter(
          (id) =>
            !updatedMetricsData.some((updatedItem) => updatedItem.id === id)
        );

      const imagesToDelete = imageData
        .map((item) => item.id)
        .filter(
          (id) => !updatedImageData.some((updatedItem) => updatedItem.id === id)
        );

      await Promise.all([
        ...statsToDelete.map((id) =>
          fetch(portfolio_url + `/items/${id}`, { method: "DELETE" })
        ),
        ...metricsToDelete.map((id) =>
          fetch(portfolio_url + `/items/${id}`, { method: "DELETE" })
        ),
        ...imagesToDelete.map((id) =>
          fetch(portfolio_url + `/items/${id}`, { method: "DELETE" })
        ),
      ]);

      get_portfolio();
      setIsEditing(false);
      setNewImages([]);
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    get_portfolio();
  };

  const handlePortfolioInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePortfolio((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatsInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStats = [...editableStatsData];
    updatedStats[index] = { ...updatedStats[index], [name]: value };
    setEditableStatsData(updatedStats);
  };

  const handleMetricsInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMetrics = [...editableMetricsData];
    updatedMetrics[index] = { ...updatedMetrics[index], [name]: value };
    setEditableMetricsData(updatedMetrics);
  };

  const handleAddStat = () => {
    setEditableStatsData([
      ...editableStatsData,
      { title: "", data: "", category: "stats" },
    ]);
  };

  const handleDeleteStat = (index) => {
    const updatedStats = [...editableStatsData];
    updatedStats.splice(index, 1);
    setEditableStatsData(updatedStats);
  };

  const handleAddMetric = () => {
    setEditableMetricsData([
      ...editableMetricsData,
      { title: "", data: "", category: "metrics" },
    ]);
  };

  const handleDeleteMetric = (index) => {
    const updatedMetrics = [...editableMetricsData];
    updatedMetrics.splice(index, 1);
    setEditableMetricsData(updatedMetrics);
  };

  const onDragEndStats = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedStats = Array.from(editableStatsData);
    const [movedStat] = reorderedStats.splice(result.source.index, 1);
    reorderedStats.splice(result.destination.index, 0, movedStat);

    setEditableStatsData(reorderedStats);
  };

  const onDragEndMetrics = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedMetrics = Array.from(editableMetricsData);
    const [movedMetric] = reorderedMetrics.splice(result.source.index, 1);
    reorderedMetrics.splice(result.destination.index, 0, movedMetric);
    setEditableMetricsData(reorderedMetrics);
  };

  const onDragEndImages = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(editableImageData);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setEditableImageData(reorderedImages);
  };

  const handlePortfolioImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditablePortfolio({
        ...editablePortfolio,
        portfolio_image: file,
      });
    }
  };

  const handlePhotosClick = () => {
    if (isEditing && photosInputRef.current) {
      photosInputRef.current.click();
    }
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);

    if (photosInputRef.current) {
      photosInputRef.current.value = "";
    }
  };

  const handleRemoveNewImage = (index) => {
    const updatedNewImages = [...newImages];
    updatedNewImages.splice(index, 1);
    setNewImages(updatedNewImages);

    if (photosInputRef.current) {
      photosInputRef.current.value = "";
    }
  };

  const handleDeleteImage = (itemId) => {
    const updatedItems = editableImageData.filter((item) => item.id !== itemId);
    setEditableImageData(updatedItems);
  };

  return (
    <div className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <div
            className="portfolio-img-wrapper"
            style={{ cursor: isEditing ? "pointer" : "default" }}
            onMouseEnter={() => isEditing && setIsHovering(true)}
            onMouseLeave={() => isEditing && setIsHovering(false)}
            onClick={handlePortfolioImageClick}
          >
            <img
              src={
                editablePortfolio.portfolio_image instanceof File
                  ? URL.createObjectURL(editablePortfolio.portfolio_image)
                  : editablePortfolio.portfolio_image
                  ? `http://127.0.0.1:8000${editablePortfolio.portfolio_image}`
                  : tempPhoto
              }
              alt="Athlete Avatar"
              className="portfolio-img"
            />
            {isEditing && isHovering && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#eee",
                  fontSize: "26px",
                  borderRadius: "50%",
                }}
              >
                <FontAwesomeIcon icon={faCamera} />
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            )}
          </div>
          <div>
            {isEditing ? (
              <div className="portfolio-athlete-info-edit">
                <div className="portfolio-edit-header">
                  <h3>Sport: </h3>
                  <input
                    type="text"
                    className="portfolio-edit-text"
                    name="sport"
                    value={editablePortfolio.sport || ""}
                    onChange={handlePortfolioInputChange}
                  />
                </div>
                <div className="portfolio-edit-header">
                  <h3>Position: </h3>
                  <input
                    type="text"
                    className="portfolio-edit-text"
                    name="position"
                    value={editablePortfolio.position || ""}
                    onChange={handlePortfolioInputChange}
                  />
                </div>
                <div className="portfolio-edit-header">
                  <h3>Team: </h3>
                  <input
                    type="text"
                    className="portfolio-edit-text"
                    name="team"
                    value={editablePortfolio.team || ""}
                    onChange={handlePortfolioInputChange}
                  />
                </div>
              </div>
            ) : (
              <div className="portfolio-athlete-info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p>
                  {portfolio.sport} - {portfolio.position}
                </p>
                <p>{portfolio.team}</p>
              </div>
            )}
          </div>
        </div>
        <section className="portfolio-section">
          <h2 className="portfolio-section_title">About Me</h2>
          {isEditing ? (
            <textarea
              className="portfolio-edit-textarea"
              name="description"
              value={editablePortfolio.description || ""}
              onChange={handlePortfolioInputChange}
            />
          ) : (
            <p className="portfolio-section_para">{portfolio.description}</p>
          )}
        </section>
        {statsData.length > 0 || isEditing ? (
          <section className="portfolio-section">
            <h2 className="portfolio-section_title">Stats</h2>
            {isEditing ? (
              <DragDropContext onDragEnd={onDragEndStats}>
                <Droppable droppableId="statsList">
                  {(provided) => (
                    <ul
                      className="portfolio-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {editableStatsData.map((item, index) => (
                        <Draggable
                          key={
                            item.id ? `stat-${item.id}` : `stat-new-${index}`
                          }
                          draggableId={
                            item.id ? `stat-${item.id}` : `stat-new-${index}`
                          }
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className={`portfolio-list_item draggable-item ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <input
                                type="text"
                                className="portfolio-edit-text"
                                name="title"
                                placeholder="Title"
                                value={item.title || ""}
                                onChange={(e) =>
                                  handleStatsInputChange(e, index)
                                }
                              />
                              :&nbsp;
                              <input
                                type="text"
                                className="portfolio-edit-text"
                                name="data"
                                placeholder="Data"
                                value={item.data || ""}
                                onChange={(e) =>
                                  handleStatsInputChange(e, index)
                                }
                              />
                              <button
                                type="button"
                                className="portfolio-button"
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDeleteStat(index)}
                              >
                                Delete
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <ul className="portfolio-list">
                {statsData.map((item) => (
                  <li className="portfolio-list_item" key={item.id}>
                    {item.title}: {item.data}
                  </li>
                ))}
              </ul>
            )}
            {isEditing && (
              <button
                type="button"
                className="portfolio-button"
                onClick={handleAddStat}
              >
                Add Stat
              </button>
            )}
          </section>
        ) : null}
        {(metricsData.length > 0 || isEditing) && (
          <section className="portfolio-section">
            <h2 className="portfolio-section_title">Performance Metrics</h2>
            {isEditing ? (
              <DragDropContext onDragEnd={onDragEndMetrics}>
                <Droppable droppableId="metricsList">
                  {(provided) => (
                    <ul
                      className="portfolio-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {editableMetricsData.map((item, index) => (
                        <Draggable
                          key={
                            item.id
                              ? `metric-${item.id}`
                              : `metric-new-${index}`
                          }
                          draggableId={
                            item.id
                              ? `metric-${item.id}`
                              : `metric-new-${index}`
                          }
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className={`portfolio-list_item edit-item draggable-item ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <input
                                type="text"
                                className="portfolio-edit-text"
                                name="title"
                                placeholder="Title"
                                value={item.title || ""}
                                onChange={(e) =>
                                  handleMetricsInputChange(e, index)
                                }
                              />
                              :&nbsp;
                              <input
                                type="text"
                                className="portfolio-edit-text"
                                name="data"
                                placeholder="Data"
                                value={item.data || ""}
                                onChange={(e) =>
                                  handleMetricsInputChange(e, index)
                                }
                              />
                              <button
                                type="button"
                                className="portfolio-button"
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDeleteMetric(index)}
                              >
                                Delete
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="portfolio-metrics">
                {metricsData.map((item) => (
                  <div className="portfolio-metric" key={item.id}>
                    <h3>{item.title}</h3>
                    <p className="portfolio-section_para">{item.data}</p>
                  </div>
                ))}
              </div>
            )}
            {isEditing && (
              <button
                type="button"
                className="portfolio-button"
                onClick={handleAddMetric}
              >
                Add Metric
              </button>
            )}
          </section>
        )}
        {editableImageData.length > 0 && !isEditing && (
          <section className="portfolio-section">
            <h2 className="portfolio-section_title">Media Gallery</h2>
            <div className="portfolio-media-grid">
              {editableImageData.map((item) => (
                <div className="portfolio-media-item" key={item.id}>
                  <img
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt="Game Moment"
                    className="portfolio-media-img"
                  />
                </div>
              ))}
              {newImages.length > 0 && (
                <>
                  {newImages.map((file, index) => (
                    <div className="portfolio-media-item" key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Game Moment"
                        className="portfolio-media-img"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
        )}
        {isEditing && (
          <section className="portfolio-section">
            <h2 className="portfolio-section_title">Media Gallery</h2>
            <div className="portfolio-media-grid">
              <DragDropContext onDragEnd={onDragEndImages}>
                <Droppable droppableId="imagesList" direction="horizontal">
                  {(provided) => (
                    <div
                      className="portfolio-media-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {editableImageData.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={`image-${item.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`portfolio-media-item ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                            >
                              <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt="Game Moment"
                                className="portfolio-media-img-edit"
                              />
                              <button
                                className="portfolio-media-x"
                                onClick={() => handleDeleteImage(item.id)}
                              >
                                X
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {newImages.map((file, index) => (
                        <div
                          className="portfolio-media-item new-image"
                          key={`new-${index}`}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt="New Game Moment"
                            className="portfolio-media-img-edit"
                          />
                          <button
                            className="portfolio-media-x"
                            onClick={() => handleRemoveNewImage(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                className="portfolio-media-add"
                onClick={handlePhotosClick}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </section>
        )}
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            ref={photosInputRef}
            style={{ display: "none" }}
            onChange={handlePhotosChange}
          />
        )}
        <section className="portfolio-section">
          <div className="portfolio-contact-wrapper">
            {(portfolio.email || portfolio.phone_number) && !isEditing && (
              <>
                <h3 className="portfolio-contact-title">Contact Me</h3>
                <div className="contact-info">
                  {portfolio.email && (
                    <a
                      href={`mailto:${portfolio.email}`}
                      className="contact-icon"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  )}
                  {portfolio.phone_number && (
                    <a
                      href={`tel:${portfolio.phone_number}`}
                      className="contact-icon"
                    >
                      <FontAwesomeIcon icon={faPhone} />
                    </a>
                  )}
                </div>
              </>
            )}
            {isEditing && (
              <>
                <h3 className="portfolio-contact-title">Contact Me</h3>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Email: </b>
                  <input
                    type="email"
                    name="email"
                    value={editablePortfolio.email || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Email"
                    className="edit-portfolio-input"
                  />
                </div>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Phone Number: </b>
                  <input
                    type="text"
                    name="phone_number"
                    value={editablePortfolio.phone_number || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Phone Number"
                    className="edit-portfolio-input"
                  />
                </div>
              </>
            )}
            {(portfolio.instagram ||
              portfolio.linkedin ||
              portfolio.youtube ||
              portfolio.facebook) &&
              !isEditing && (
                <>
                  <h3 className="portfolio-contact-title">Follow Me</h3>
                  <div className="social-links">
                    {portfolio.instagram && (
                      <a
                        href={portfolio.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                    {portfolio.linkedin && (
                      <a
                        href={portfolio.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                    {portfolio.youtube && (
                      <a
                        href={portfolio.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    )}
                    {portfolio.facebook && (
                      <a
                        href={portfolio.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    )}
                  </div>
                </>
              )}
            {isEditing && (
              <>
                <h3 className="portfolio-contact-title">Follow Me</h3>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Instagram: </b>
                  <input
                    type="text"
                    name="instagram"
                    value={editablePortfolio.instagram || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Instagram"
                    className="edit-portfolio-input"
                  />
                </div>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Linkedin: </b>
                  <input
                    type="text"
                    name="linkedin"
                    value={editablePortfolio.linkedin || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Linkedin"
                    className="edit-portfolio-input"
                  />
                </div>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Youtube: </b>
                  <input
                    type="text"
                    name="youtube"
                    value={editablePortfolio.youtube || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Youtube"
                    className="edit-portfolio-input"
                  />
                </div>
                <div className="edit-portfolio-item">
                  <b className="edit-portfolio-title">Facebook: </b>
                  <input
                    type="text"
                    name="facebook"
                    value={editablePortfolio.facebook || ""}
                    onChange={handlePortfolioInputChange}
                    placeholder="Facebook"
                    className="edit-portfolio-input"
                  />
                </div>
              </>
            )}
          </div>
        </section>
        {!isEditing && loggedInUser === username && (
          <button className="portfolio-button" onClick={handleEditClick}>
            EDIT
          </button>
        )}
        {isEditing && (
          <div className="portfolio-edit-buttons">
            <button className="portfolio-button" onClick={handleSaveClick}>
              SAVE
            </button>
            <button className="portfolio-button" onClick={handleCancelClick}>
              CANCEL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
