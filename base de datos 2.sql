-- Tabla Login sin rol
CREATE TABLE Login (
    login_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email LIKE '%@yachaytech.edu.ec'),
    password VARCHAR(255) NOT NULL  -- En producción debe ir cifrada
);

-- Tabla UserProfile contiene la información académica del usuario
CREATE TABLE UserProfile (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login_id INT UNIQUE,  -- puede ser NULL si el usuario no se loguea
    role VARCHAR(20) NOT NULL CHECK (role IN ('professor', 'supervisor')),
    name VARCHAR(100) NOT NULL,
    school VARCHAR(100) NOT NULL,
    department_id VARCHAR(10),  -- sólo para profesores
    FOREIGN KEY (login_id) REFERENCES Login(login_id) ON DELETE SET NULL
);

-- Tabla Classroom sin cambios
CREATE TABLE Classroom (
    classroom_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    capacity INT NOT NULL
);

-- Tabla Signature
CREATE TABLE Signature (
    signature_id VARCHAR(10) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    credits VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    objectives TEXT NOT NULL,
    contribution_text TEXT NOT NULL,
    has_lab VARCHAR(10) NOT NULL,
    parent_classroom_id INT NOT NULL,
    FOREIGN KEY (parent_classroom_id) REFERENCES Classroom(classroom_id) ON DELETE RESTRICT
);



-- Tabla Program sin cambios
CREATE TABLE Program (
    ID_program INT NOT NULL PRIMARY KEY,
    signature_id VARCHAR(10) NOT NULL,
    curricular_unit VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    teaching_hours NUMERIC NOT NULL,
    internship_hours NUMERIC NOT NULL,
    independent_learning_hours NUMERIC NOT NULL,
    total_hours NUMERIC NOT NULL,
    semester NUMERIC NOT NULL,
    school VARCHAR(100) NOT NULL,
    methodology TEXT NOT NULL,
    prerequisites VARCHAR(100),
    corequisites VARCHAR(100),
    learning_outcomes TEXT NOT NULL,
    bibliography TEXT NOT NULL,
    FOREIGN KEY (signature_id) REFERENCES Signature(signature_id) ON DELETE CASCADE
);

-- Syllabus referenciado ahora a user_id
CREATE TABLE Syllabus (
    ID_Syllabus VARCHAR(20) NOT NULL PRIMARY KEY,
    ID_program INT NOT NULL,
    professor_user_id INT NOT NULL,
    academic_term VARCHAR(20) NOT NULL,
    upload_date VARCHAR(20) NOT NULL,
    document_path VARCHAR(255) NOT NULL,
    is_active VARCHAR(10) NOT NULL CHECK (is_active IN ('true', 'false')),
    parallel_code VARCHAR(10) NOT NULL,
    weekly_class_schedule TEXT NOT NULL,
    weekly_tutoring_schedule TEXT NOT NULL,
    evaluation_midterm NUMERIC NOT NULL,
    evaluation_formative NUMERIC NOT NULL,
    evaluation_lab NUMERIC,
    evaluation_final NUMERIC NOT NULL,
    FOREIGN KEY (ID_program) REFERENCES Program(ID_program) ON DELETE CASCADE,
    FOREIGN KEY (professor_user_id) REFERENCES UserProfile(user_id) ON DELETE CASCADE
);

-- Syllabus_supervisor también usa user_id
CREATE TABLE Syllabus_supervisor (
    supervisor_user_id INT NOT NULL,
    ID_Syllabus VARCHAR(20) NOT NULL,
    signature_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (supervisor_user_id) REFERENCES UserProfile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ID_Syllabus) REFERENCES Syllabus(ID_Syllabus) ON DELETE CASCADE,
    FOREIGN KEY (signature_id) REFERENCES Signature(signature_id) ON DELETE CASCADE
);
