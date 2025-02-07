import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const sheetURL = "https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv";
const categoryTag = "design-experiment"; // Change this tag

const DesignExperiment = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch(sheetURL);
      const csvData = await response.text();
      const parsedData = parseCSV(csvData);

      // Filter projects with the "design-experiment" tag
      const filteredProjects = parsedData.filter(
        (item) => item.tag.toLowerCase() === categoryTag
      );
      setProjects(filteredProjects);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }

  function parseCSV(csvText) {
    const rows = csvText.split("\n").map((row) => row.split(",").map((item) => item.trim()));
    return rows.slice(1).map(([tag, title, description, imageUrl, linkUrl]) => ({
      tag,
      title,
      description,
      imageUrl,
      linkUrl,
    }));
  }

  if (projects.length === 0) {
    return (
      <div>
        <h2>No projects found for Design Experiment 🚨</h2>
        <Link to="/portfolio/collections" className="back-link">← Back to collections</Link>
      </div>
    );
  }

  return (
    <div className="collection-detail">
      <Link to="/portfolio/collections" className="back-link">← Back to collections</Link>
      <h1 className="category-title">Design Experiment</h1>

      {projects.map((project, index) => (
        <section className="project-section" key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>

          {project.imageUrl && (
            <img src={project.imageUrl} alt={project.title} className="project-image" />
          )}

          {project.linkUrl && (
            <a href={project.linkUrl} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          )}
        </section>
      ))}
    </div>
  );
};

export default DesignExperiment;