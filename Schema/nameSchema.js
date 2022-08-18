const Joi = require('joi');

const NameSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long&422',
    'any.required': '"name" is required&400',
  }),
});

const validateName = (name) => {
  const { error } = NameSchema.validate(name);

  if (error) {
    const [message, code] = error.message.split('&');
    return {
      code,
      message,
    };
  }

  return { ok: true };
};

module.exports = { validateName };