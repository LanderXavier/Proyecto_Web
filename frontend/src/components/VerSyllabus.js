import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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