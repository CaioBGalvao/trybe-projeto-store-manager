const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';

  const [result] = await connection.execute(query);

  return result;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM products WHERE id = ?;';

  const [[result]] = await connection
    .execute(
      query, [id],
  );
      // em caso de erro: retorna undefined por causa da desestruturação
  return result;
};

const create = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES (?);';

  const dbResponse = await connection.execute(query, [name]);
  const result = {
    id: dbResponse.insertId,
    name,
  };
  return result;
 };

module.exports = { getAll, getById, create };

// [
//   ResultSetHeader {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 4,
//     info: '',
//     serverStatus: 2,
//     warningStatus: 0
//   },
//   undefined
// ]