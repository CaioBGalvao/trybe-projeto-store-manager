const Joi = require('joi');

const salesSchema = Joi.array().items(Joi.object().keys({
  productId: Joi.number().strict().required()
    .messages({
      'string.min': '"name" length must be at least 5 characters long&422',
      'any.required': '"productId" is required&400',
    }),
  quantity: Joi.number().min(1).required().messages({
    'number.min': '"quantity" must be at least 1&422',
    'any.required': '"quantity" is required&400',
  }),
}));

const validateSales = (salesArray) => {
  const { error } = salesSchema.validate(salesArray);

  if (error) {
    const [message, code] = error.message.split('&');
    return {
      code,
      message,
    };
  }

  return { ok: true };
};

module.exports = { validateSales };