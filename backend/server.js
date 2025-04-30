const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = 'key'; // guarda esto en variables de entorno

const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // debe ir antes de las rutas


// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",	
  password: "",
  database: "proyecto"
});
//Ruta para Login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });
    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token, user: { email: user.email } });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
});
// Ruta para registrar nuevo usuario
app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (email, password) VALUES (?, ?)";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Error en el servidor", error: err });
    return res.status(201).json({ message: "Usuario creado correctamente" });
  });
});


// Iniciar servidor
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
