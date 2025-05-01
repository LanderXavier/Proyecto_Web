import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CursoPDF from './components/CursoPdf';
import DashboardInicio from './components/DashboardInicio'; // Asegúrate de crear este archivo
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardInicio />} />
        <Route path="/curso-pdf" element={<CursoPDF />} />
      </Routes>
    </Router>
  );
}

export default App;
