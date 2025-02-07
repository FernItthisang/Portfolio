import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqfIHdrf1FSq4Rzm9BZDEpIgx52taJpa9fsekdn5-2HTSlAmC_DO0dumZ1z5oeMBCxSfvNaAhFI23E/pub?gid=1320737039&output=csv";

const categoryTag = "architecture"; // Fetch projects with this tag

const Architecture = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch(sheetURL);
      if (!response.ok) throw new Error("Failed to fetch data.");

      const csvData = await response.text();
      const parsedData = parseCSV(csvData);

      // ✅ Filter projects that match "architecture" tag (case insensitive)
      const filteredProjects = parsedData.filter(
        (item) => item.Tag?.toLowerCase() === categoryTag
      );

      setProjects(filteredProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setError("Failed to load projects.");
      setLoading(false);
    }
  }

  function parseCSV(csvText) {
    const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    return parsedData.data.map((row) => ({
      Tag: row["Tag"] || "",
      Category: row["Category"] || "",
      Title: row["Title"] || "",
      Description: row["Description"] || "",
      ImageURL: row["Image URL"] || "",
      ExtraImages: row["Extra Images (comma-separated)"]
        ? row["Extra Images (comma-separated)"].split(",").map((img) => img.trim())
        : [],
      LinkURL: row["Link URL"] || "",
    }));
  }

  return (
    <div className="collection-detail">
      <Link to="/portfolio/collections" className="back-link">← Back to collections</Link>
      <h1 className="category-title">Architecture</h1>

      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && projects.length === 0 && <h2>No projects found for Architecture 🚨</h2>}

      {projects.map((project, index) => (
        <section className="project-section" key={index}>
          <h2>{project.Title}</h2>
          <p>{project.Description}</p>

          {/* ✅ Display Main Image */}
          {project.ImageURL && (
            <img src={project.ImageURL} alt={project.Title} className="project-image" />
          )}

          {/* ✅ Display Extra Images */}
          {project.ExtraImages.length > 0 && (
            <div className="extra-images">
              <h3>More Images:</h3>
              <div className="image-grid">
                {project.ExtraImages.map((img, i) => (
                  <img key={i} src={img} alt={`Extra ${i}`} className="extra-image" />
                ))}
              </div>
            </div>
          )}

          {project.LinkURL && (
            <a href={project.LinkURL} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          )}
        </section>
      ))}
    </div>
  );
};

export default Architecture;