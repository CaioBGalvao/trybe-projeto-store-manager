const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';

  const [result] = await connection.execute(query);
  // [[{result}]]
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
 
const update = async (updateObject) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?;';

  const { id, name } = updateObject;
  const [result] = await connection.execute(query, [name, id]);

  if (!result) {
    return undefined;
  }

  const response = {
    id,
    name,
  };

  return response;
};

const exclude = async ({ id }) => {
  const query = 'DELETE FROM products WHERE id = ?;';

  const [result] = await connection.execute(query, [id]);

  if (!result) {
    return undefined;
  }

  const response = {
    id,
  };

  return response;
};

module.exports = { getAll, getById, create, update, exclude };

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