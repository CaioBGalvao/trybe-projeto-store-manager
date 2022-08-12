const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/products', routes.productsRoute); // <<<< rota de PRODUTOS

app.use((err, _req, res, _next) => {
  if (err.message === 'connect ECONNREFUSED 127.0.0.1:3306') {
    return res.status(500).json({ message: 'banco esta off' });
  }
  res.status(500).json({ message: 'Erro do middleware' });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;