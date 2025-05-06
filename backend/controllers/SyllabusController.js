const Syllabus = require('../models/Syllabus');

exports.createSyllabus = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Crear un nuevo registro en la tabla `Syllabus`
    const newSyllabus = await Syllabus.create({ name, code });

    return res.status(201).json({ message: 'Syllabus creada correctamente', Syllabus: newSyllabus });
  } catch (error) {
    console.error('Error al crear la Syllabus:', error);
    return res.status(500).json({ message: 'Error al crear la Syllabus', error });
  }
};