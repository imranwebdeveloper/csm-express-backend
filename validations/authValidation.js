const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(), // Updated to match "username" in model
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string().valid("user", "admin").optional(), // Ensure only allowed roles
    image: Joi.string().uri().optional(), // Ensure it's a valid URL if provided
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    image: Joi.string().uri().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
