import Joi from "joi";

export const bookingSchema = Joi.object({
  businessID: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  time: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userName: Joi.string().required(),
  status: Joi.string().required(),
});

export const businessSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  category: Joi.string().required(),
  contactPerson: Joi.string().required(),
  email: Joi.string().email().required(),
  photo: Joi.string().uri().required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
});
