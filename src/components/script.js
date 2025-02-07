import React, { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Load data from the Google Sheet when the component mounts
    loadDataFromSheet();
  }, []);

  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqfIHdrf1FSq4Rzm9BZDEpIgx52taJpa9fsekdn5-2HTSlAmC_DO0dumZ1z5oeMBCxSfvNaAhFI23E/pub?gid=0&single=true&output=csv';

  // Fetch data from Google Sheets
  function loadDataFromSheet() {
    fetch(sheetURL)
      .then((response) => response.text())  // Fetch the CSV file and convert to text
      .then((csvData) => {
        const parsedData = parseCSV(csvData);  // Parse the CSV into an array of rows
        setCollections(parsedData);  // Update the state with the parsed data
      })
      .catch((error) => console.error("Error fetching CSV data:", error));
  }

  // CSV Parsing Function
  function parseCSV(csvText) {
    const rows = csvText.split("\n");  // Split into rows based on newlines
    return rows.map((row) => row.split(","));  // Split each row into columns by commas
  }

  // Check image URL validity
  const validateImageUrl = (imageUrl) => {
    const img = new Image();
    img.onload = () => console.log(`Image loaded successfully: ${imageUrl}`);
    img.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
    img.src = imageUrl; // This will trigger the onload or onerror
  };

  return (
    <>
      <div className="collection-header">
        <h4>I’m an architect who visualizes space and a data visualizer who visualizes data</h4>
        <h1>My collections 👀</h1>
      </div>
      <section className="collections" id="collections-container">
        {collections.slice(1).map((row, index) => {  // Skip the header row
          const [tag, title, description, imageUrl, linkUrl] = row;

          // Validate the image URL
          validateImageUrl(imageUrl);

          return (
            <div className="collection" key={index}>
              <a href={`detail.html?tag=${tag}`}>
                <img src={imageUrl} alt={title} />
                <h2>{title}</h2>
                <p>{description}</p>
              </a>
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