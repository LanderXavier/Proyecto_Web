# Proyecto Web - Gestión de Syllabus y Programas

Este proyecto es una plataforma web para la gestión de syllabus y programas académicos, desarrollada con **React** (frontend), **Node.js/Express** (backend) y **MySQL** (base de datos), todo orquestado con **Docker**.

---



## Características

- Registro y autenticación de usuarios con roles (profesor, invitado, supervisor).
- Gestión de escuelas, asignaturas (signatures), programas y syllabus.
- Visualización, creación y eliminación de registros.
- Interfaz moderna y responsiva con React y Bootstrap.
- API RESTful protegida con JWT.
- Base de datos relacional MySQL.
- Despliegue y desarrollo simplificados con Docker Compose.

---

## Tecnologías

- **Frontend:** React, React-Bootstrap, Axios
- **Backend:** Node.js, Express, Sequelize, JWT, bcryptjs
- **Base de datos:** MySQL 8
- **Contenedores:** Docker, Docker Compose

---

## Ejecutar

docker compose up --build


## Base de datos

School: id_school, school 

Signature: id, curricular_unit, UOC, learning_outcomes, content, total_hours, semester, school

Program: ID_program, signature_id, curricular_unit, content, teaching_hours, internship_hours,independent_learning_hours, total_hours, semester, school, methodology, prerequisites, corequisites, learning_outcomes, bibliograpy

Syllabus: syllabus_id, ID_program, syllabus_name, objetivos, temas, bibliograf

UserProfile: user_id, login_id, role, name, school

Login: login_id, email, password

--
## Frontend


| Component             | Function |
|-----------------------|----------|
| `Login.js`            | Auth with JWT |
| `DashboardInicio.js`  | Main dashboard |
| `CursoPdf.js` | Syllabus creation form |
| `ProgramaPdf.js`  | Academic program form |
| `VerSyllabus.js`        | Read-only syllabus viewer |
| `PlantillaPdf.js`       | PDF generation layout |

---
## Authors
Lander Lliguicota
MArk el Chiza
## Ejecutar

docker compose up --build
