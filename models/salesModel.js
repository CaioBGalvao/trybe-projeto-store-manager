/* eslint-disable max-lines-per-function */
const connection = require('./connection');

const createSales = async () => {
  const querySales = 'INSERT INTO sales () VALUES();';

  const [resultSales] = await connection.execute(querySales);

  const saleId = resultSales.insertId;

  return saleId;
};

const createsSalesProducts = async ({ saleId, salesArray }) => {
  const querySalesProduct = `INSERT INTO sales_products
  (sale_id, product_id, quantity) 
  VALUES (?, ?, ?);`;

  await Promise
    .all(salesArray
      .map((sale) => connection
        .execute(querySalesProduct, [saleId, sale.productId, sale.quantity])));

  // caso de erro a função retorna o erro

  // Promise.allSettled

  const result = {
    id: saleId,
    itemSold: salesArray,
  };

  return result;
};

module.exports = { createSales, createsSalesProducts };

// Result sales
// {
// ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 3,
//   info: '',
//   serverStatus: 2,
//   warningStatus: 0
// }