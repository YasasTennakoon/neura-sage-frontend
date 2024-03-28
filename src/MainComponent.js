import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import FileUplode from "./components/FileUplode";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import CognitiveExamination from "./components/CognitiveExamination";
import PredictionScreen from "./components/PredictionScreen";
import DiseaseDetection from "./components/DiseaseDetection";
import MRIUplode from "./components/MRIUplode";
import ImagePredictionScreen from "./components/ImagePredictionScreen";

const RouteChangeListener = ({ onRouteChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof onRouteChange === 'function') {
      onRouteChange(location, navigate);
    }
  }, [location, navigate, onRouteChange]);

  return null;
};

const MainComponent = () => {
  const [pageTitle, setPageTitle] = useState();
  const titles = {
    "/": "Home",
    "/home": "Home Page",
    "/file-upload": "Uplode Brain MRI and Patient Information",
    "/cognitive": "Cognitive Examination",
    "/display_prediction": "Disease Diagnosis Results",
    "/display_detection": "Disease Detection",
    "/mri_uplode": "Uplode Brain MRI",
    "/display_image_screen": "Disease Diagnosis Result"
  };
  const handleRouteChange = (location, navigate) => {
    setPageTitle(titles[location.pathname]);

  };
  return (
    <Router>
      <div className="main">
        <div className="top-bar">
          <div className="center-content tool-bar-title">{pageTitle}</div>
          <RouteChangeListener onRouteChange={handleRouteChange} />
        </div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/file-upload" element={<FileUplode />} />
          <Route path="/cognitive" element={<CognitiveExamination />} />
          <Route path="/display_prediction" element={<PredictionScreen />} />
          <Route path="/display_detection" element={<DiseaseDetection />} />
          <Route path="/mri_uplode" element={<MRIUplode />} />
          <Route path="/display_image_screen" element={<ImagePredictionScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainComponent;