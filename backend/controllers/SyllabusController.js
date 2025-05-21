const Syllabus = require('../models/Syllabus');

exports.createSyllabus = async (req, res) => {
  try {
    const {
      ID_program, // foreign key
      professor_user_id,
      academic_term,
      upload_date,
      document_path,
      is_active,
      parallel_code,
      weekly_class_schedule,
      weekly_tutoring_schedule,
      evaluation_midterm,
      evaluation_formative,
      evaluation_lab,
      evaluation_final
    } = req.body;

    // Crear un nuevo registro en la tabla `Syllabus`
    const newSyllabus = await Syllabus.create({
      ID_program,
      professor_user_id,
      academic_term,
      upload_date,
      document_path,
      is_active,
      parallel_code,
      weekly_class_schedule,
      weekly_tutoring_schedule,
      evaluation_midterm,
      evaluation_formative,
      evaluation_lab,
      evaluation_final
    });

    return res.status(201).json({ message: 'Syllabus creada correctamente', Syllabus: newSyllabus });
  } catch (error) {
    console.error('Error al crear la Syllabus:', error);
    return res.status(500).json({ message: 'Error al crear la Syllabus', error });
  }
};