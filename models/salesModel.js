const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT 
    SalesTable.date,
    SalesProductTable.sale_id,
    SalesProductTable.product_id,
    SalesProductTable.quantity
      FROM
  StoreManager.sales AS SalesTable
    INNER JOIN
  StoreManager.sales_products AS SalesProductTable
    ON SalesTable.id = SalesProductTable.sale_id
    ORDER BY SalesTable.id, SalesProductTable.sale_id;`;

  const [result] = await connection.execute(query);
  // em caso de erro: retorna undefined por causa da desestruturação
  return result;
};

const getById = async ({ id }) => {
  const query = `SELECT 
    SalesTable.date,
    SalesProductTable.sale_id,
    SalesProductTable.product_id,
    SalesProductTable.quantity
      FROM
    sales AS SalesTable
      INNER JOIN
    sales_products AS SalesProductTable 
      ON SalesTable.id = SalesProductTable.sale_id
      WHERE SalesTable.id = ?
      ORDER BY SalesTable.id, SalesProductTable.sale_id;`;

  const [[result]] = await connection
    .execute(
      query, [id],
    );
  // em caso de erro: retorna undefined por causa da desestruturação
  return result;
};

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

  // caso de erro em alguma promise retorna o erro

  // Promise.allSettled

  const result = {
    id: saleId,
    itemSold: salesArray,
  };

  return result;
};

module.exports = { getAll, getById, createSales, createsSalesProducts };
