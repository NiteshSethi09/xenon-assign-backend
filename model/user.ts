import Joi from "joi";
import { model, ObjectIdSchemaDefinition, Schema } from "mongoose";

export interface Item {
  productId: ObjectIdSchemaDefinition;
  quantity: number;
}

interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<User> = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export function validateUser(object: User): string | undefined {
  const { error } = Joi.object<User>({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(object);

  if (error) return error.details[0].message;
}

export default model<User>("User", userSchema);
