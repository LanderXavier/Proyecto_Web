import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
    bibliografia: '',
    ID_program: '', // Agregado para almacenar el ID_program
    school: '',
    methodology: '',
    prerequisites: '',
    corequisites: ''
  });

  const [programData, setProgramData] = useState([]);
  const [mostrarFormato, setMostrarFormato] = useState(false);
  const printRef = useRef();
  const navigate = useNavigate();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    }
  }, [navigate]);

  // Obtener los programas disponibles
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token del usuario
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/program/programs`, // Endpoint para obtener los programas
          {
            headers: {
              Authorization: `Bearer ${token}`, // Envía el token en los headers
            },
          }
        );
        setProgramData(response.data); // Guarda los programas en el estado
      } catch (error) {
        console.error('Error al obtener los programas:', error);
      }
    };

    fetchProgramData();
  }, []);

  // Auto completar los campos basados en el programa seleccionado
  useEffect(() => {
    if (curso.ID_program) {
      const selectedProgram = programData.find((program) => program.ID_program === parseInt(curso.ID_program));
      if (selectedProgram) {
        setCurso((prevCurso) => ({
          ...prevCurso,
          nombre: selectedProgram.curricular_unit,
          codigo: selectedProgram.Syllabus_id,
          semestre: selectedProgram.semester,
          descripcion: selectedProgram.content,
          totalHoras: selectedProgram.total_hours,
          school: selectedProgram.school,
          methodology: selectedProgram.methodology,
          prerequisites: selectedProgram.prerequisites,
          corequisites: selectedProgram.corequisites,
        }));
      }
    }
  }, [curso.ID_program, programData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveToDatabase = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Syllabus/create`,
        {
          ID_program: curso.ID_program, // Enviar el ID del programa
          name: curso.nombre,
          code: curso.codigo,
          // Otros campos necesarios para el syllabus...
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error al guardar en la base de datos');
    }
  };

  const handlePreview = () => {
    setMostrarFormato(true);
  };

  const handleSave = () => {
    const options = {
      margin: 1,
      filename: `${curso.nombre}-curso.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
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
              <Form.Label>Seleccionar Programa</Form.Label>
              <Form.Control
                as="select"
                name="ID_program"
                value={curso.ID_program}
                onChange={handleChange}
              >
                <option value="">Seleccione un programa</option>
                {programData.map((program) => (
                  <option key={program.ID_program} value={program.ID_program}>
                    {program.curricular_unit}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

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

            <Form.Group className="mb-3">
              <Form.Label>Escuela</Form.Label>
              <Form.Control 
                type="text" 
                name="school" 
                value={curso.school} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Metodología</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="methodology" 
                value={curso.methodology} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prerequisitos</Form.Label>
              <Form.Control 
                type="text" 
                name="prerequisites" 
                value={curso.prerequisites} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Corequisitos</Form.Label>
              <Form.Control 
                type="text" 
                name="corequisites" 
                value={curso.corequisites} 
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
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Regresar al Dashboard
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
