import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerPrograma = () => {
  const [programas, setProgramas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/program/programs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgramas(response.data);
      } catch (error) {
        console.error('Error al obtener los programas:', error);
        alert('Error al obtener los programas');
      }
    };

    fetchProgramas();
  }, []);

  const filteredProgramas = programas.filter((programa) => {
    const term = searchTerm.toLowerCase();
    return (
      programa.ID_program?.toString().toLowerCase().includes(term) ||
      (programa.Syllabus_id?.toString().toLowerCase().includes(term)) ||
      (programa.curricular_unit?.toLowerCase().includes(term)) ||
      (programa.total_hours?.toString().toLowerCase().includes(term)) ||
      (programa.semester?.toString().toLowerCase().includes(term)) ||
      (programa.school?.toLowerCase().includes(term))
    );
  });

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Lista de Programas</h2>
      <div className="mb-3 text-end">
        <input
          type="text"
          className="form-control w-auto d-inline"
          placeholder="Buscar por palabra o ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Syllabus ID</th> */}
            <th>Unidad Curricular</th>
            <th>Horas Totales</th>
            <th>Semestre</th>
            <th>Escuela</th>
          </tr>
        </thead>
        <tbody>
          {filteredProgramas.map((programa) => (
            <tr key={programa.ID_program}>
              <td>{programa.ID_program}</td>
              {/* <td>{programa.Syllabus_id}</td> */}
              <td>{programa.curricular_unit}</td>
              <td>{programa.total_hours}</td>
              <td>{programa.semester}</td>
              <td>{programa.school}</td>
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

export default VerPrograma;