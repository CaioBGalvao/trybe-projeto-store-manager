const { salesModel } = require('../models');
const { productsModel } = require('../models');
const { validateSales } = require('../Schema');

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
  const response = await salesModel.createsSalesProducts({ salesArray, saleId });
  return response;
};

module.exports = { create };