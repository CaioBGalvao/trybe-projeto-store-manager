const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const response = await productsService.getAll();
  if (response === undefined) {
    return res.status(404)
      .send({ message: 'Product not found' });
  }
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params; // Talvez precise transformar essa string em number
  const response = await productsService.getById(id);
  if (response === undefined) {
    return res.status(404)
      .send({ message: 'Product not found' });
  }
  return res.status(200).json(response);
};

module.exports = { getAll, getById };