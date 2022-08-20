const express = require('express');

const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', productsController.create)
  .put('/:id', productsController.update)
  .delete('/:id', productsController.exclude);

module.exports = productsRoute;