import React, { useEffect, useState } from "react";
import "../styles/Portfolio.css";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const loggedInUser = sessionStorage.getItem("username");

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
  };

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

      const allItems = [...updatedStatsData, ...updatedMetricsData];

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

      const originalStatsIds = statsData
        .map((item) => item.id)
        .filter((id) => id);
      const currentStatsIds = updatedStatsData
        .map((item) => item.id)
        .filter((id) => id);
      const statsToDelete = originalStatsIds.filter(
        (id) => !currentStatsIds.includes(id)
      );

      const originalMetricsIds = metricsData
        .map((item) => item.id)
        .filter((id) => id);
      const currentMetricsIds = updatedMetricsData
        .map((item) => item.id)
        .filter((id) => id);
      const metricsToDelete = originalMetricsIds.filter(
        (id) => !currentMetricsIds.includes(id)
      );

      await Promise.all([
        ...statsToDelete.map((id) =>
          fetch(portfolio_url + `/items/${id}`, { method: "DELETE" })
        ),
        ...metricsToDelete.map((id) =>
          fetch(portfolio_url + `/items/${id}`, { method: "DELETE" })
        ),
      ]);

      get_portfolio();
      setIsEditing(false);
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

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <div>
          <img
            src={`http://127.0.0.1:8000${portfolio.portfolio_image}`}
            alt="Athlete Avatar"
            className="portfolio-img"
          />
        </div>
        <div className="portfolio-athlete-info">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
              <h1>
                {firstName} {lastName}
              </h1>
              <p>
                {portfolio.sport} | {portfolio.position}
              </p>
              <p>{portfolio.team}</p>
            </>
          )}
        </div>
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
                        key={item.id ? `stat-${item.id}` : `stat-new-${index}`}
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
                              onChange={(e) => handleStatsInputChange(e, index)}
                            />
                            :&nbsp;
                            <input
                              type="text"
                              className="portfolio-edit-text"
                              name="data"
                              placeholder="Data"
                              value={item.data || ""}
                              onChange={(e) => handleStatsInputChange(e, index)}
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
                          item.id ? `metric-${item.id}` : `metric-new-${index}`
                        }
                        draggableId={
                          item.id ? `metric-${item.id}` : `metric-new-${index}`
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

      {imageData.length > 0 && (
        <section className="portfolio-section">
          <h2 className="portfolio-section_title">Media Gallery</h2>
          <div className="portfolio-media-grid">
            {imageData.map((item) => (
              <div className="portfolio-media-item" key={item.id}>
                <img
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt="Game Moment"
                />
                {isEditing && (
                  <p>Cannot edit images directly in this example.</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="portfolio-section">
        <h2 className="portfolio-section_title">Contact</h2>
        <p className="portfolio-section_para">
          If you're interested in my profile or want to get in touch, feel free
          to reach out!
        </p>
        <button className="portfolio-button">Contact Me</button>
      </section>
    </div>
  );
}

export default Portfolio;
