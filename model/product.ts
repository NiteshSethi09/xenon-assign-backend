import Joi from "joi";
import { model, Schema } from "mongoose";

interface Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

const productSchema: Schema<Product> = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export function validateProduct(
  object: Product
): Joi.ValidationErrorItem[] | undefined {
  const { error } = Joi.object<Product>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
  }).validate(object);

  if (error) return error.details;
}

export default model<Product>("Product", productSchema);
