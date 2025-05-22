import React, { useState, useEffect } from 'react';
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
  const [schoolOptions, setSchoolOptions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
      setUserInfo(user);
      setMensaje(`Bienvenido, ${user.name} (${user.role})`);
      setShowUserInfo(true);

      // Si es invitado, redirige después de mostrar la bienvenida
      if (user.role === 'invitado') {
        setTimeout(() => {
          navigate('/ver-syllabus');
        }, 2000); // 2 segundos de espera
      }
    } catch (err) {
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

  useEffect(() => {
    // Obtener escuelas desde el backend
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`${API_URL}/School/schools`);
        setSchoolOptions(response.data);
      } catch (err) {
        setSchoolOptions([]);
      }
    };
    fetchSchools();
  }, []);

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
          {userInfo.role !== 'invitado' && (
            <button 
              onClick={handleContinue}
              className="btn btn-primary w-100"
            >
              Continuar al Dashboard
            </button>
          )}
          {userInfo.role === 'invitado' && (
            <div className="alert alert-info">Redirigiendo a la lista de syllabus...</div>
          )}
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
                  {schoolOptions.map((school) => (
                    <option key={school.id_school} value={school.school}>{school.school}</option>
                  ))}
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