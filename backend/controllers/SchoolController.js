const School = require('../models/School');

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    return res.status(200).json(schools);
  } catch (error) {
    console.error('Error al obtener las escuelas:', error);
    return res.status(500).json({ message: 'Error al obtener las escuelas', error });
  }
};
