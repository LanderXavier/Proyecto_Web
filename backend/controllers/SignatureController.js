const Signature = require('../models/Signature');

exports.createSignature = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Crear un nuevo registro en la tabla `signature`
    const newSignature = await Signature.create({ name, code });

    return res.status(201).json({ message: 'Signature creada correctamente', signature: newSignature });
  } catch (error) {
    console.error('Error al crear la signature:', error);
    return res.status(500).json({ message: 'Error al crear la signature', error });
  }
};