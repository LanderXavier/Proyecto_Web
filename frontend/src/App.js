import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CursoPDF from './components/CursoPdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importante: esto activa el comportamiento del modal


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CursoPDF" element={<CursoPDF />} />
      </Routes>
    </Router>
  );
}

export default App;
