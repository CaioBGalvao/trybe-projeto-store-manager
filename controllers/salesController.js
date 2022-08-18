const salesService = require('../services/salesService');

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

module.exports = { create };