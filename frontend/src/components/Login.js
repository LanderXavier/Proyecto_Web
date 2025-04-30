import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [registroEmail, setRegistroEmail] = useState('');
  const [registroPassword, setRegistroPassword] = useState('');
  const [registroMensaje, setRegistroMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = response.data; // Extrae el token de la respuesta
      localStorage.setItem('token', token); // Guarda el token en localStorage
      setMensaje(`Bienvenido`);
      setTimeout(() => {
        navigate('/CursoPdf'); // Redirige a CursoPdf.js
      }, 1000);
    } catch (err) {
      console.error("Error en el cliente:", err.response?.data || err.message);
      setMensaje('Credenciales incorrectas');
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, { // Elimina "res"
        email: registroEmail,
        password: registroPassword,
      });
      setRegistroMensaje('Usuario registrado correctamente');
      setRegistroEmail('');
      setRegistroPassword('');
    } catch (err) {
      setRegistroMensaje('Error al registrar el usuario');
    }
  };

  return (
    <div className="card p-4 shadow w-50 mx-auto mt-5">
      <h2 className="mb-4 text-center">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        {mensaje && <div className="alert alert-info mt-3 text-center">{mensaje}</div>}
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-link" data-bs-toggle="modal" data-bs-target="#registroModal">
          ¿No tienes cuenta? Regístrate
        </button>
      </div>

      {/* Modal de registro */}
      <div className="modal fade" id="registroModal" tabIndex="-1" aria-labelledby="registroModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleRegister}>
            <div className="modal-header">
              <h5 className="modal-title" id="registroModalLabel">Registro de usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={registroEmail}
                       onChange={(e) => setRegistroEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" value={registroPassword}
                       onChange={(e) => setRegistroPassword(e.target.value)} required />
              </div>
              {registroMensaje && (
                <div className="alert alert-info text-center">{registroMensaje}</div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-success">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
