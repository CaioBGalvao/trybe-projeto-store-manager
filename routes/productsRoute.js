const express = require('express');

const { productsController } = require('../controllers');

const productsRoute = express.Router();

productsRoute
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', productsController.create);

module.exports = productsRoute;