const { salesModel } = require('../models');
const { productsModel } = require('../models');
const { validateSales } = require('../Schema');

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

const create = async (salesArray) => {
  const check = validateSales(salesArray);
  if (check.code) {
    return check;
  }

  const result = await Promise
    .all(salesArray
      .map(({ productId }) => productsModel
        .getById({ id: productId })));

  if (result
    .some((promiseResults) => promiseResults === undefined)) {
    return undefined;
  }

  const saleId = await salesModel.createSales();
  const response = await salesModel.createsSalesProducts({ saleId, salesArray });
  return response;
};

module.exports = { getAll, getById, create };