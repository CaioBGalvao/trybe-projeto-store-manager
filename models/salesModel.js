const connection = require('./connection');

const queryGetAll = `SELECT 
    Sales.date,
    Product.sale_id AS saleId,
    Product.product_id AS productId,
    Product.quantity
FROM
    StoreManager.sales AS Sales
        INNER JOIN
    StoreManager.sales_products AS Product ON Sales.id = Product.sale_id;`;

const queryById = `SELECT 
    Sales.date,
    Product.product_id AS productId,
    Product.quantity
FROM
    StoreManager.sales AS Sales
        INNER JOIN
    StoreManager.sales_products AS Product ON Sales.id = Product.sale_id
WHERE
    Sales.id = ?
ORDER BY Product.sale_id ASC , Product.product_id ASC;`;

const getAll = async () => {
  const [result] = await connection.execute(queryGetAll);
  return result;
};

const getById = async (id) => {
  const [result] = await connection
    .execute(
      queryById, [id],
    );

  if (result.length === 0) {
    return undefined;
  }

  return result;
};

const createSales = async () => {
  const querySales = 'INSERT INTO StoreManager.sales () VALUES();';

  const [resultSales] = await connection.execute(querySales);

  const saleId = resultSales.insertId;

  return saleId;
};

const createsSalesProducts = async ({ saleId, salesArray }) => {
  const querySalesProduct = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) 
  VALUES (?, ?, ?);`;

  await Promise
    .all(salesArray
      .map((sale) => connection
        .execute(querySalesProduct, [saleId, sale.productId, sale.quantity])));

  // caso de erro em alguma promise retorna o erro

  // Promise.allSettled
  const result = {
    id: saleId,
    itemsSold: salesArray,
  };

  return result;
};

module.exports = { getAll, getById, createSales, createsSalesProducts };
