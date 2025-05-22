import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false); // Nuevo estado para controlar la visualización
  const [registroEmail, setRegistroEmail] = useState('');
  const [registroPassword, setRegistroPassword] = useState('');
  const [registroRole, setRegistroRole] = useState('');
  const [registroName, setRegistroName] = useState('');
  const [registroSchool, setRegistroSchool] = useState('');
  const [registroMensaje, setRegistroMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user)); // Guarda la información del usuario
      setUserInfo(user);
      setMensaje(`Bienvenido, ${user.name} (${user.role})`);
      setShowUserInfo(true); // Mostrar la información del usuario
    } catch (err) {
      console.error("Error en el cliente:", err.response?.data || err.message);
      setMensaje('Credenciales incorrectas');
    }
  };

  const handleContinue = () => {
    navigate('/dashboard'); // Redirigir al dashboard cuando el usuario haga click en continuar
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email: registroEmail,
        password: registroPassword,
        role: registroRole,
        name: registroName,
        school: registroSchool,
      });
      setRegistroMensaje('Usuario registrado correctamente');
      setRegistroEmail('');
      setRegistroPassword('');
      setRegistroRole('');
      setRegistroName('');
      setRegistroSchool('');
    } catch (err) {
      setRegistroMensaje('Error al registrar el usuario');
    }
  };

  return (
    <div className="card p-4 shadow w-50 mx-auto mt-5">
      {!showUserInfo ? (
        <>
          <h2 className="mb-4 text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            {mensaje && <div className="alert alert-info mt-3 text-center">{mensaje}</div>}
          </form>

          <div className="text-center mt-3">
            <button className="btn btn-link" data-bs-toggle="modal" data-bs-target="#registroModal">
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-4">Bienvenido</h2>
          <div className="card p-3 mb-4">
            <h5>Información del Usuario:</h5>
            <p><strong>Nombre:</strong> {userInfo.name}</p>
            <p><strong>Rol:</strong> {userInfo.role}</p>
            <p><strong>Escuela:</strong> {userInfo.school}</p>
          </div>
          <button 
            onClick={handleContinue}
            className="btn btn-primary w-100"
          >
            Continuar al Dashboard
          </button>
        </div>
      )}

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
                <input
                  type="email"
                  className="form-control"
                  value={registroEmail}
                  onChange={(e) => setRegistroEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={registroPassword}
                  onChange={(e) => setRegistroPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={registroName}
                  onChange={(e) => setRegistroName(e.target.value)}
                  required
                />
              </div>

              
              <div className="mb-3">
                <label>Rol</label>
                <select
                  className="form-control"
                  value={registroRole}
                  onChange={(e) => setRegistroRole(e.target.value)}
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="profesor">Profesor</option>
                  <option value="invitado">Invitado</option>
                  <option value="supervisor">Profesor Supervisor</option>
                </select>
              </div>


              <div className="mb-3">
                <label>Escuela</label>
                <select
                  className="form-control"
                  value={registroSchool}
                  onChange={(e) => setRegistroSchool(e.target.value)}
                  required
                >
                  <option value="">Seleccione una escuela</option>
                  <option value="Escuela de Ciencias Matematicas y Computacionales">Escuela de Ciencias Matemáticas y Computacionales</option> 
                  <option value="Escuela de Ciencias Biologicas e Ingenieria">Escuela de Ciencias Biológicas e Ingeniería</option>
                  <option value="Escuela de Ciencias Fisicas y Nanotecnologia">Escuela de Ciencias Físicas y Nanotecnología</option>
                  <option value="scuela de Ciencias de la Tierra, Energia y Ambiente">Escuela de Ciencias de la Tierra, Energía y Ambiente</option>
                  <option value="Escuela de Ciencias Químicas e Ingenieria">Escuela de Ciencias Químicas e Ingeniería</option>
                  <option value="Escuela de Ciencias Agropecuarias y Agroindustriales">Escuela de Ciencias Agropecuarias y Agroindustriales</option>
                </select>
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