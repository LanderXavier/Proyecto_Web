import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './DashboardInicio.css';

const DashboardInicio = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Si no hay token, redirigir al login
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const tarjetas = [
    {
      titulo: 'Ver Syllabus',
      descripcion: 'Consulta y revisa los syllabus existentes',
      icono: '📄',
      ruta: '/ver-syllabus'
    },
    {
      titulo: 'Añadir Syllabus',
      descripcion: 'Registra un nuevo syllabus de curso',
      icono: '➕',
      ruta: '/curso-pdf'
    }
  ];

  const tarjetasPrograma = [
    {
      titulo: 'Ver Programa',
      descripcion: 'Consulta y revisa los programas existentes',
      icono: '📚',
      ruta: '/ver-programa'
    },
    {
      titulo: 'Añadir Programa',
      descripcion: 'Registra un nuevo programa de curso',
      icono: '➕',
      ruta: '/curso-programa'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header/Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>
            Dashboard Syllabus | {userInfo.role ? `Rol: ${userInfo.role}` : 'Usuario no identificado'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <Container className="main-content">
        {/* Bienvenida personalizada */}
        <div className="welcome-section text-center mb-5">
          <h2>Bienvenido, {userInfo.name || 'Usuario no identificado'}</h2>
          {userInfo.school && <p className="text-muted">Escuela: {userInfo.school}</p>}
        </div>

        {/* Tarjetas de Syllabus */}
        <h3 className="section-title mb-4">Gestión de Syllabus</h3>
        <Row className="justify-content-center">
          {tarjetas.map((card, idx) => (
            <Col md={4} key={`syllabus-${idx}`} className="mb-4">
              <Card className="dashboard-card hover-effect" onClick={() => navigate(card.ruta)}>
                <Card.Body className="text-center">
                  <div className="card-icon">{card.icono}</div>
                  <Card.Title>{card.titulo}</Card.Title>
                  <Card.Text>{card.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tarjetas de Programa */}
        <h3 className="section-title mb-4 mt-5">Gestión de Programas</h3>
        <Row className="justify-content-center">
          {tarjetasPrograma.map((card, idx) => (
            <Col md={4} key={`programa-${idx}`} className="mb-4">
              <Card className="dashboard-card hover-effect" onClick={() => navigate(card.ruta)}>
                <Card.Body className="text-center">
                  <div className="card-icon">{card.icono}</div>
                  <Card.Title>{card.titulo}</Card.Title>
                  <Card.Text>{card.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  );
};

export default DashboardInicio;