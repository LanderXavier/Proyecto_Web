const Syllabus = require('../models/Syllabus');

exports.createSyllabus = async (req, res) => {
  try {
    const {
      ID_program, // foreign key
      syllabus_name,
      objetivos,
      temas,
      bibliografia
    } = req.body;

    // Crear un nuevo registro en la tabla `Syllabus`
    const createdSyllabus = await Syllabus.create({
      ID_program,
      syllabus_name,
      objetivos,
      temas,
      bibliografia
    });

    return res.status(201).json({ message: 'Syllabus creada correctamente', Syllabus: createdSyllabus });
  } catch (error) {
    console.error('Error al crear la Syllabus:', error);
    return res.status(500).json({ message: 'Error al crear la Syllabus', error });
  }
};

exports.getAllSyllabus = async (req, res) => {
  try {
    const syllabusList = await Syllabus.findAll();
    return res.status(200).json(syllabusList);
  } catch (error) {
    console.error('Error al obtener los syllabus:', error);
    return res.status(500).json({ message: 'Error al obtener los syllabus', error });
  }
};

