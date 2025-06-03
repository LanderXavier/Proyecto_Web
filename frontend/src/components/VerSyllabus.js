import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const VerSyllabus = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const esInvitado = userInfo?.role === 'invitado';

  const filteredSyllabus = syllabusList.filter((syllabus) => {
    const term = searchTerm.toLowerCase();
    return (
      syllabus.syllabus_id?.toString().toLowerCase().includes(term) ||
      syllabus.ID_program?.toString().toLowerCase().includes(term) ||
      syllabus.syllabus_name?.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este syllabus?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/Syllabus/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSyllabusList(syllabusList.filter((s) => s.syllabus_id !== id));
      } catch (error) {
        alert('Error al eliminar el syllabus');
      }
    }
  };

  const handleEstadoChange = async (id, estado) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${process.env.REACT_APP_API_URL}/Syllabus/${id}/estado`, { estado }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSyllabusList(syllabusList.map((s) => s.syllabus_id === id ? { ...s, estado } : s));
    } catch (error) {
      alert('Error al actualizar el estado');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Lista de Syllabus</h2>
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
            <th>ID Programa</th>
            <th>Nombre Syllabus</th>
            <th>Ver PDF</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSyllabus.map((syllabus) => (
            <tr key={syllabus.syllabus_id}>
              <td>{syllabus.syllabus_id}</td>
              <td>{syllabus.ID_program}</td>
              <td>{syllabus.syllabus_name}</td>
              <td>
                {syllabus.pdf_url ? (
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => window.open(syllabus.pdf_url, '_blank')}
                  >
                    Ver PDF
                  </Button>
                ) : (
                  <span className="text-muted">No disponible</span>
                )}
              </td>
              <td>
                <select value={syllabus.estado || 'pendiente'} onChange={e => handleEstadoChange(syllabus.syllabus_id, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="revisado">Revisado</option>
                </select>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(syllabus.syllabus_id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center mt-4">
        {!esInvitado && (
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Regresar al dashboard
          </button>
        )}
      </div>
    </Container>
  );
};

export default VerSyllabus;