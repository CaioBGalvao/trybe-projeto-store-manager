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

const update = async (updateObject) => {
  const { id, objName } = updateObject;

  const check = validateName(objName);
  if (check.code) {
    return check;
  }

  const { name } = objName;

  const result = await productsModel.getById({ id });
  if (!result) {
    return undefined;
  }

  const response = await productsModel.update({ id, name });
  return response;
};

const exclude = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return undefined;
  }
  const response = await productsModel.exclude(id);
  return response;
 };

module.exports = { getAll, getById, create, update, exclude };