const productsModel = require('../models/productsModel');
const { validateName } = require('../Schema');

const getAll = async () => productsModel.getAll();

const getById = async (id) => productsModel.getById(id);

const create = async (name) => {
  const check = validateName(name);
  if (check.code) {
    return check;
  }

  const response = await productsModel.create(name);
  return response;
};

module.exports = { getAll, getById, create };