const Joi = require("joi");

const contentValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow(null, ""),
    youtubeUrl: Joi.string()
      .uri()
      .pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)
      .required(),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { contentValidation };
