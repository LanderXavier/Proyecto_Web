import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerSyllabus = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/Syllabus/syllabus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSyllabusList(response.data);
      } catch (error) {
        console.error('Error al obtener los syllabus:', error);
        alert('Error al obtener los syllabus');
      }
    };

    fetchSyllabus();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Lista de Syllabus</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Programa</th>
            <th>Nombre Syllabus</th>
            {/* Agrega aquí más columnas si tu modelo Syllabus tiene más campos */}
          </tr>
        </thead>
        <tbody>
          {syllabusList.map((syllabus) => (
            <tr key={syllabus.syllabus_id}>
              <td>{syllabus.syllabus_id}</td>
              <td>{syllabus.ID_program}</td>
              <td>{syllabus.syllabus_name}</td>
              {/* Agrega aquí más celdas si tu modelo Syllabus tiene más campos */}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Regresar al Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default VerSyllabus;