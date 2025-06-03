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

exports.deleteSyllabus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Syllabus.destroy({ where: { syllabus_id: id } });
    if (deleted) {
      return res.status(200).json({ message: 'Syllabus eliminado correctamente' });
    } else {
      return res.status(404).json({ message: 'Syllabus no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el syllabus:', error);
    return res.status(500).json({ message: 'Error al eliminar el syllabus', error });
  }
};

exports.updateEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const updated = await Syllabus.update({ estado }, { where: { syllabus_id: id } });
    if (updated[0]) {
      return res.status(200).json({ message: 'Estado actualizado correctamente' });
    } else {
      return res.status(404).json({ message: 'Syllabus no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    return res.status(500).json({ message: 'Error al actualizar el estado', error });
  }
};

