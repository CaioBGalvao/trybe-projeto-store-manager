const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const response = await salesService.getAll();
  if (!response) {
    return res.status(404)
      .json({ message: 'Sale not found' });
  }
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productIdObject = { id };
  const response = await salesService.getById(productIdObject);
  if (!response) {
    return res.status(404)
      .json({ message: 'Sale not found' });
  }
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const salesArray = req.body;
  const response = await salesService.create(salesArray);
  if (!response) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }

  if (response.code) {
    return res.status(Number(response.code))
      .json({ message: response.message });
  }
  return res.status(201).json(response);
};

module.exports = { getAll, getById, create };