const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Crear un nuevo registro en la tabla `Syllabus`
    const newProgram = await Program.create({ name, code });

    return res.status(201).json({ message: 'Program creada correctamente', Program: newProgram });
  } catch (error) {
    console.error('Error al crear Program:', error);
    return res.status(500).json({ message: 'Error al crear la Program', error });
  }
};
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
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
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll(); // Obtiene todos los programas
    return res.status(200).json(programs); // Devuelve los programas en formato JSON
  } catch (error) {
    console.error('Error al obtener los programas:', error);
    return res.status(500).json({ message: 'Error al obtener los programas', error });
  }
};