import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';



function App () {
  <MainPage />
  
  return (
    <Router>
      <h1 className="main-title">Todo List</h1>
      <nav>
        <Link to="/">Main</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;