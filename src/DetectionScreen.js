import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import FileUplode from "./components/FileUplode";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import CognitiveExamination from "./components/CognitiveExamination";
import PredictionScreen from "./components/PredictionScreen";
 
const DetectionScreen = () => {
  return (
    <Router>
      <div className="main">
      <div className="top-bar">
      <div className="user-details">
        {true && (
          <>
            <span>sdsd</span>
            {/* other user details */}
          </>
        )}
      </div>
    </div>
        <NavigationBar/>
        <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/file-upload" element={<FileUplode />} />
          <Route path="/cognitive" element={<CognitiveExamination />} />
          <Route path="/display_prediction" element={<PredictionScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default DetectionScreen;