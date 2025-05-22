import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CursoPDF from './components/CursoPdf';
import CursoProgram from './components/ProgramPdf';
import VerPrograma from './components/VerPrograma';
import VerSyllabus from './components/VerSyllabus';
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
        <Route path="/curso-programa" element={<CursoProgram />} />
        <Route path="/ver-programa" element={<VerPrograma />} />
        <Route path="/ver-syllabus" element={<VerSyllabus />} />
      </Routes>
    </Router>
  );
}

export default App;
