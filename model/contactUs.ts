import Joi from "joi";
import { model, Schema } from "mongoose";

interface Product {
  name: string;
  email: string;
  description: string;
}

const ContactSchema: Schema<Product> = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export function validateForm(object: Product): string | undefined {
  const { error } = Joi.object<Product>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    description: Joi.string().trim().required(),
  }).validate(object);

  if (error) return error.details[0].message;
}

export default model<Product>("Contact", ContactSchema);
