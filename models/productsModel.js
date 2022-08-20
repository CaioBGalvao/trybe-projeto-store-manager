const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';

  const [result] = await connection.execute(query);
  // [[{result}]]
  return result;
};

const getById = async ({ id }) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  const [[result]] = await connection
    .execute(
      query, [id],
  );
      // em caso de erro: retorna undefined por causa da desestruturação
  return result;
};

const create = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';

  const [dbResponse] = await connection.execute(query, [name]);

  const result = {
    id: dbResponse.insertId,
    name,
  };
  
  return result;
};
 
const update = async (updateObject) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';

  const { id, name } = updateObject;

  const [result] = await connection.execute(query, [name, id]);
  console.log('result do update', result);

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
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

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