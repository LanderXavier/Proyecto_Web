const Signature = require('../models/signature');

exports.createSignature = async (req, res) => {
  try {
    const {
      curricular_unit,
      UOC,
      learning_outcomes,
      content,
      total_hours,
      semester,
      school,
    } = req.body;

    const newSignature = await Signature.create({
      curricular_unit,
      UOC,
      learning_outcomes,
      content,
      total_hours,
      semester,
      school,
    });

    return res.status(201).json({ message: 'Asignatura creada correctamente', signature: newSignature });
  } catch (error) {
    console.error('Error al crear la asignatura:', error);
    return res.status(500).json({ message: 'Error al crear la asignatura', error });
  }
};

exports.getSignatures = async (req, res) => {
  try {
    const signatures = await Signature.findAll({
      attributes: [
        'id', 
        'curricular_unit',
        'UOC',
        'learning_outcomes',
        'content',
        'total_hours',
        'semester',
        'school',
      ],
    });
    return res.status(200).json(signatures);
  } catch (error) {
    console.error('Error al obtener las asignaturas:', error);
    return res.status(500).json({ message: 'Error al obtener las asignaturas', error });
  }
};
