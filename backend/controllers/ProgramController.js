const Program = require('../models/Program');

exports.createProgram = async (req, res) => {
  try {
    const {
      signature_id, // foreign key
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
      signature_id,
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

    const programs = await Program.findAll({
      attributes: [
        'ID_program',
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
        'corequisites'
      ],
    });
    return res.status(200).json(programs);
  } catch (error) {
    console.error('Error al obtener los programas:', error);
    return res.status(500).json({ message: 'Error al obtener los programas', error });
  }
};