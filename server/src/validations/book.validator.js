import httpStatus from "http-status";
import Joi from "joi";

const formatErrorMessage = (error) => {
  return error.details[0].message;
};

export const addBookValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json(formatErrorMessage(error));
  }

  next();
};
