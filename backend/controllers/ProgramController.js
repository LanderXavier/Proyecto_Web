const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
  try {
    const {
      Syllabus_id,
      curricular_unit,
      content,
      teaching_hours,
      internship_hours,
      independent_learning_hours,
      total_hours,
      semester,
      school,
      methodology,
      prerequisites,
      corequisites,
      learning_outcomes,
      bibliography,
    } = req.body;

    const newProgram = await Program.create({
      Syllabus_id,
      curricular_unit,
      content,
      teaching_hours,
      internship_hours,
      independent_learning_hours,
      total_hours,
      semester,
      school,
      methodology,
      prerequisites,
      corequisites,
      learning_outcomes,
      bibliography,
    });

    return res.status(201).json({ message: 'Programa creado correctamente', program: newProgram });
  } catch (error) {
    console.error('Error al crear el programa:', error);
    return res.status(500).json({ message: 'Error al crear el programa', error });
  }
};

exports.getPrograms = async (req, res) => {
  try {
<<<<<<< HEAD
    const programs = await Program.findAll({//agregar filtros
=======
    const programs = await Program.findAll({ //Agregar filtros, sugerencias cambiar el findAll. Tipo escoger la escuela y salga toda la lista de programas
>>>>>>> b52ee3ff272b6e65bbef3478b6a3457778fe49e7
      attributes: [
        'ID_program',
        'Syllabus_id',
        'curricular_unit',
        'content',
        'teaching_hours',
        'internship_hours',
        'independent_learning_hours',
        'total_hours',
        'semester',
        'school',
        'methodology',
        'prerequisites',
        'corequisites',
      ],
    });
    return res.status(200).json(programs);
  } catch (error) {
    console.error('Error al obtener los programas:', error);
    return res.status(500).json({ message: 'Error al obtener los programas', error });
  }
};