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
      objectives,
      units,
      learningOutcomes,
      bibliographyMain,
      bibliographyComplementary,
      contribution,
      major,
      course,
      code,
      study_mode
    } = req.body;

    // Convertir campos numéricos vacíos a 0
    const safeTeachingHours = teaching_hours === '' ? 0 : teaching_hours;
    const safeInternshipHours = internship_hours === '' ? 0 : internship_hours;
    const safeIndependentLearningHours = independent_learning_hours === '' ? 0 : independent_learning_hours;
    const safeTotalHours = total_hours === '' ? 0 : total_hours;
    const safeSemester = semester === '' ? 0 : semester;

    const newProgram = await Program.create({
      signature_id,
      curricular_unit,
      content,
      teaching_hours: safeTeachingHours,
      internship_hours: safeInternshipHours,
      independent_learning_hours: safeIndependentLearningHours,
      total_hours: safeTotalHours,
      semester: safeSemester,
      school,
      methodology,
      prerequisites,
      corequisites,
      learning_outcomes,
      bibliography,
      objectives,
      units,
      learningOutcomes,
      bibliographyMain,
      bibliographyComplementary,
      contribution,
      major,
      course,
      code,
      study_mode
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

exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Program.destroy({ where: { ID_program: id } });
    if (deleted) {
      return res.status(200).json({ message: 'Programa eliminado correctamente' });
    } else {
      return res.status(404).json({ message: 'Programa no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el programa:', error);
    return res.status(500).json({ message: 'Error al eliminar el programa', error });
  }
};

exports.updateEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const updated = await Program.update({ estado }, { where: { ID_program: id } });
    if (updated[0]) {
      return res.status(200).json({ message: 'Estado actualizado correctamente' });
    } else {
      return res.status(404).json({ message: 'Programa no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    return res.status(500).json({ message: 'Error al actualizar el estado', error });
  }
};