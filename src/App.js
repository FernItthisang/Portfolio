import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./components/landingpage";
import CollectionsPage from "./components/collectionspage";
import AboutPage from "./components/aboutpage";

// Import collection pages
import Architecture from "./components/collections/Architecture";
import DesignExperiment from "./components/collections/DesignExperiment";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/portfolio" element={<LandingPage />} />
        <Route path="/portfolio/collections" element={<CollectionsPage />} />
        <Route path="/portfolio/about" element={<AboutPage />} />

        {/* ✅ Make sure paths match exactly */}
        <Route path="/collections/architecture" element={<Architecture />} />
        <Route path="/portfolio/collections/design-experiment" element={<DesignExperiment />} />
      </Routes>
    </Router>
  );
};

export default App;
