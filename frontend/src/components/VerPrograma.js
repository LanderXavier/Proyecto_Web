import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

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

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este programa?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/program/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgramas(programas.filter((p) => p.ID_program !== id));
      } catch (error) {
        alert('Error al eliminar el programa');
      }
    }
  };

  const handleEstadoChange = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${process.env.REACT_APP_API_URL}/program/${id}/estado`, { estado }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgramas(programas.map((p) => p.ID_program === id ? { ...p, estado } : p));
    } catch (error) {
      alert('Error al actualizar el estado');
    }
  };

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
            <th>Unidad Curricular</th>
            <th>Horas Totales</th>
            <th>Semestre</th>
            <th>Escuela</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProgramas.map((programa) => (
            <tr key={programa.ID_program}>
              <td>{programa.ID_program}</td>
              <td>{programa.curricular_unit}</td>
              <td>{programa.total_hours}</td>
              <td>{programa.semester}</td>
              <td>{programa.school}</td>
              <td>
                <select value={programa.estado || 'pendiente'} onChange={e => handleEstadoChange(programa.ID_program, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="revisado">Revisado</option>
                </select>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(programa.ID_program)}>
                  <FaTrash />
                </Button>
              </td>
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