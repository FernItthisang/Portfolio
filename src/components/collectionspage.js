import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    loadDataFromSheet();
  }, []);

  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqfIHdrf1FSq4Rzm9BZDEpIgx52taJpa9fsekdn5-2HTSlAmC_DO0dumZ1z5oeMBCxSfvNaAhFI23E/pub?output=csv';

  function loadDataFromSheet() {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = parseCSV(csvData);
        setCollections(parsedData);
      })
      .catch((error) => console.error("Error fetching CSV data:", error));
  }

  function parseCSV(csvText) {
    const rows = csvText.split("\n");
    return rows.map((row) => row.split(","));
  }

  return (
    <>
      <div className="collection-header">
        <h4>I’m an architect who visualizes space and a data visualizer who visualizes data</h4>
        <h1>My collections 👀</h1>
      </div>
      <section className="collections" id="collections-container">
        {collections.slice(1).map((row, index) => {
          const [tag, title, description, imageUrl] = row;

          return (
            <div className="collection" key={index}>
              {/* Use React Router Link instead of <a href> */}
              <Link to={`/collections/${tag}`}>
                <img src={imageUrl} alt={title} />
                <div className="collection-content">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>

      <footer>
        <p>&copy; 2023 by Fern Itthisang.</p>
      </footer>
    </>
  );
};

export default CollectionsPage;