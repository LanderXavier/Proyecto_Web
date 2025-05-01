import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardInicio.css'; // Estilos personalizados opcionales
import { Card, Container, Row, Col } from 'react-bootstrap';

const DashboardInicio = () => {
  const navigate = useNavigate();

  const tarjetas = [
    {
      titulo: 'Ver Syllabus',
      descripcion: 'Consulta y revisa los syllabus existentes',
      icono: '📄',
      ruta: '/ver-syllabus' // Puedes redirigir aquí a un componente futuro
    },
    {
      titulo: 'Añadir Syllabus',
      descripcion: 'Registra un nuevo syllabus de curso',
      icono: '➕',
      ruta: '/curso-pdf'

    }
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Dashboard Syllabus</h2>
      <Row className="justify-content-center">
        {tarjetas.map((card, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card className="dashboard-card" onClick={() => navigate(card.ruta)} style={{ cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <div style={{ fontSize: '40px' }}>{card.icono}</div>
                <Card.Title>{card.titulo}</Card.Title>
                <Card.Text>{card.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardInicio;
