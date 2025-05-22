import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container, Tabs, Tab } from 'react-bootstrap';
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
    major: '',
    course: '',
    code: '',
    study_mode: '',
    contribution: '',
  });

  const [activeTab, setActiveTab] = useState('general');
  const navigate = useNavigate();

  // Verificar si el token existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

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
        major: '',
        course: '',
        code: '',
        study_mode: '',
        contribution: '',
      });
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
          <Tabs
            id="program-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="general" title="1. Información General">
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
                <Form.Label>Carrera/Mención</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={program.major || ''}
                  onChange={handleChange}
                  placeholder="Ej: Computer Science Engineering"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="course"
                  value={program.course || ''}
                  onChange={handleChange}
                  placeholder="Ej: Web Applications"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={program.code || ''}
                  onChange={handleChange}
                  placeholder="Ej: ECMC-COM-1117"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unidad Curricular</Form.Label>
                <Form.Control
                  type="text"
                  name="curricular_unit"
                  value={program.curricular_unit}
                  onChange={handleChange}
                  placeholder="Ej: Professional"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Modalidad de Estudio</Form.Label>
                <Form.Control
                  type="text"
                  name="study_mode"
                  value={program.study_mode || ''}
                  onChange={handleChange}
                  placeholder="Ej: In person"
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
            </Tab>


            <Tab eventKey="prereq" title="2. Prerrequisitos y Correquisitos">
              <Form.Group className="mb-3">
                <Form.Label>Course: Prerrequisitos</Form.Label>
                <Form.Control
                  type="text"
                  name="course"
                  value={program.course || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={program.code || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course: Correquisitos</Form.Label>
                <Form.Control
                  type="text"
                  name="course"
                  value={program.prerequisites || ''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={program.corequisites || ''}
                  onChange={handleChange}
                />
              </Form.Group>

            </Tab>





            <Tab eventKey="description" title="3. Descripción del Curso">
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={program.content}
                  onChange={handleChange}
                  placeholder="Describe el curso aquí..."
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="contribution" title="4. Aporte Profesional">
              <Form.Group className="mb-3">
                <Form.Label>Aporte</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="contribution"
                  value={program.contribution || ''}
                  onChange={handleChange}
                  placeholder="Describe el aporte del curso..."
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="otros" title="5. Otros">
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
                <Form.Label>Metodología</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="methodology"
                  value={program.methodology}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resultados de Aprendizaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="learning_outcomes"
                  value={program.learning_outcomes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bibliografía</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="bibliography"
                  value={program.bibliography}
                  onChange={handleChange}
                />
              </Form.Group>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
      <div className="text-center mb-5">
        <Button variant="info" onClick={handleSaveToDatabase}>
          Guardar en la Base de Datos
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')} className="ms-3">
          Regresar al Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Program;