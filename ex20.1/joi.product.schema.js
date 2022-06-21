import joi from "joi";

export const productJoiSchema = joi.object({
  name: joi.string(),
  category: joi.string(),
  isActive: joi.boolean(),
  details: joi.object({
    description: joi.string().min(10),
    price: joi.number().greater(0),
    discount: joi.string(),
    phoneNumber: joi.string(),
    images: joi.array().min(2),
  }),
});
