import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Program = () => {
  const [program, setProgram] = useState({
    Syllabus_id: '',
    curricular_unit: '',
    content: '',
    teaching_hours: '',
    internship_hours: '',
    independent_learning_hours: '',
    total_hours: '',
    semester: '',
    school: '',
    methodology: '',
    prerequisites: '',
    corequisites: '',
    learning_outcomes: '',
    bibliography: '',
  });

  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState('');

  const navigate = useNavigate();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/Signature/signatures`
        );
        setSignatures(response.data);
      } catch (error) {
        console.error('Error fetching signatures:', error);
        alert('Error fetching signatures');
      }
    };

    fetchSignatures();
  }, []);

  useEffect(() => {
    if (selectedSignature && signatures.length > 0) {
      const found = signatures.find((s) => s.id === parseInt(selectedSignature));
      if (found) {
        setProgram((prev) => ({
          ...prev,
          curricular_unit: found.curricular_unit || '',
          content: found.content || '',
          total_hours: found.total_hours || '',
          semester: found.semester || '',
          school: found.school || '',
          learning_outcomes: found.learning_outcomes || '',
        }));
      }
    }
  }, [selectedSignature, signatures]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveToDatabase = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!selectedSignature) {
        alert('Por favor, selecciona una asignatura.');
        return;
      }

      // Validar que los campos requeridos no estén vacíos
      if (
        !program.Syllabus_id ||
        !program.curricular_unit ||
        !program.content ||
        !program.teaching_hours ||
        !program.internship_hours ||
        !program.independent_learning_hours ||
        !program.total_hours ||
        !program.semester ||
        !program.school ||
        !program.methodology ||
        !program.learning_outcomes ||
        !program.bibliography
      ) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/program/create`,
        {
          ...program,
          signatureId: selectedSignature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setProgram({
        Syllabus_id: '',
        curricular_unit: '',
        content: '',
        teaching_hours: '',
        internship_hours: '',
        independent_learning_hours: '',
        total_hours: '',
        semester: '',
        school: '',
        methodology: '',
        prerequisites: '',
        corequisites: '',
        learning_outcomes: '',
        bibliography: '',
      });
      setSelectedSignature('');
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error al guardar en la base de datos');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Formulario de Programa</h1>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Asignatura</Form.Label>
              <Form.Select
                value={selectedSignature}
                onChange={(e) => setSelectedSignature(e.target.value)}
                required
              >
                <option value="">Selecciona una asignatura</option>
                {signatures.map((signature) => (
                  <option key={signature.id} value={signature.id}>
                    {signature.curricular_unit}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Syllabus ID</Form.Label>
              <Form.Control
                type="text"
                name="Syllabus_id"
                value={program.Syllabus_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unidad Curricular</Form.Label>
              <Form.Control
                type="text"
                name="curricular_unit"
                value={program.curricular_unit}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={program.content}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Horas de Enseñanza</Form.Label>
              <Form.Control
                type="number"
                name="teaching_hours"
                value={program.teaching_hours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Horas de Prácticas</Form.Label>
              <Form.Control
                type="number"
                name="internship_hours"
                value={program.internship_hours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Horas de Aprendizaje Independiente</Form.Label>
              <Form.Control
                type="number"
                name="independent_learning_hours"
                value={program.independent_learning_hours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total de Horas</Form.Label>
              <Form.Control
                type="number"
                name="total_hours"
                value={program.total_hours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                type="number"
                name="semester"
                value={program.semester}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Escuela</Form.Label>
              <Form.Control
                type="text"
                name="school"
                value={program.school}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Metodología</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="methodology"
                value={program.methodology}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prerequisitos</Form.Label>
              <Form.Control
                type="text"
                name="prerequisites"
                value={program.prerequisites}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Corequisitos</Form.Label>
              <Form.Control
                type="text"
                name="corequisites"
                value={program.corequisites}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resultados de Aprendizaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="learning_outcomes"
                value={program.learning_outcomes}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bibliografía</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bibliography"
                value={program.bibliography}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="text-center mb-5">
        <Button variant="info" onClick={handleSaveToDatabase}>
          Guardar en la Base de Datos
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          className="ms-3"
        >
          Regresar al Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Program;