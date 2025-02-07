import React from "react";
import FernImage from "../assets/fern.webp"; // Replace with the actual image path

const landingpage = () => {
  return (
    <>
  <section id="sayhello" className="landing-container">
  <div className="landing-header">
    <h1>👋🏼 My name is Fern and I am a ...</h1>
  </div>
  <div className="landing-content">
    <h2 className="description">
     Data Visualizer,
    <br/>
     UX/UI and 
    <br/>
     Interaction Designer
    </h2>
    <div className="landing-image">
    <img src={FernImage} alt="Fern" />
  </div>
  </div>
  <div className="landing-button">
  <a href="#collections" className="button">
      Discover my collections
    </a>
  </div>
</section>
<footer>
        <p>&copy; 2023 by Fern Itthisang.</p>
      </footer>

      <script src="script.js"></script>
    </>
  );
};

export default landingpage;