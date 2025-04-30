import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CursoFormato from './CursoFormato.js';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

const CursoPdf = () => {
  const [curso, setCurso] = useState({
    nombre: '',
    codigo: '',
    semestre: '',
    totalHoras: '',
    descripcion: '',
    objetivos: '',
    temas: '',
    bibliografia: ''
  });
  const [mostrarFormato, setMostrarFormato] = useState(false);
  const printRef = useRef();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirigir si no hay token (no está autenticado)
      window.location.href = '/login'; // Redirigir al login
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Función para guardar en la base de datos
  const handleSaveToDatabase = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signature/create`, {
        name: curso.nombre,
        code: curso.codigo,
      });
      alert(response.data.message); // Muestra un mensaje de éxito
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error al guardar en la base de datos');
    }
  };
  const handlePreview = () => {
    setMostrarFormato(true);
  };

  // Función para guardar como PDF
  const handleSave = () => {
    const options = {
      margin: 1,
      filename: `${curso.nombre}-curso.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf()
      .from(printRef.current)
      .set(options)
      .save();
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Formulario de Curso</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Curso</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre" 
                value={curso.nombre} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control 
                type="text" 
                name="codigo" 
                value={curso.codigo} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Semestre</Form.Label>
              <Form.Control 
                type="text" 
                name="semestre" 
                value={curso.semestre} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total de Horas</Form.Label>
              <Form.Control 
                type="text" 
                name="totalHoras" 
                value={curso.totalHoras} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción del Curso</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcion" 
                value={curso.descripcion} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Objetivos del Curso</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="objetivos" 
                value={curso.objetivos} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Temas</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="temas" 
                value={curso.temas} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bibliografía</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="bibliografia" 
                value={curso.bibliografia} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="text-center mb-5">
        <Button variant="primary" onClick={handlePreview} className="me-2">
          Previsualizar Formato
        </Button>
        {mostrarFormato && (
          <div>
            <Button variant="success" onClick={handleSave}>
              Guardar como PDF
            </Button>
            <Button variant="info" onClick={handleSaveToDatabase}>
              Guardar en la Base de Datos
            </Button>
          </div>
        )}
      </div>

      {mostrarFormato && (
        <div ref={printRef} style={{ backgroundColor: "white", padding: "20px", marginBottom: "40px" }}>
          <CursoFormato curso={curso} />
        </div>
      )}
    </Container>
  );
};

export default CursoPdf;
