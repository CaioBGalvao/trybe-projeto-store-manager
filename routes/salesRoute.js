const express = require('express');

const { salesController } = require('../controllers');

const productsRoute = express.Router();

productsRoute
  .get('/', salesController.getAll)
  .get('/:id', salesController.getById)
  .post('/', salesController.create);

module.exports = productsRoute;