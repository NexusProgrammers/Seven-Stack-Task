import httpStatus from "http-status";
import Joi from "joi";

const formatErrorMessage = (error) => {
  return error.details[0].message;
};

export const signUpValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(100).min(3),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().optional(),
    image: Joi.string().uri(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json(formatErrorMessage(error));
  }

  next();
};

export const signInValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json(formatErrorMessage(error));
  }

  next();
};

export const updateAccountValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    image: Joi.string().uri().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json(formatErrorMessage(error));
  }

  next();
};
