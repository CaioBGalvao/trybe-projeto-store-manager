const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const response = await productsService.getAll();
  if (!response) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productIdObject = { id };
  const response = await productsService.getById(productIdObject);
  if (!response) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { name } = req.body;
  const productIdObject = { name };
  const response = await productsService.create(productIdObject);
  if (response.code) { 
    return res.status(Number(response.code))
      .json({ message: response.message });
  }
  
  return res.status(201).json(response);
};

const update = async (req, res) => {
  const { id } = req.params;
  const productIdObject = { id, objName: req.body };
  const response = await productsService.update(productIdObject);
  if (!response) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }

  if (response.code) {
    return res.status(Number(response.code))
      .json({ message: response.message });
  }

  return res.status(200).json(response);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const productIdObject = { id };
  const response = await productsService.exclude(productIdObject);
  if (!response) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

module.exports = { getAll, getById, create, update, exclude };