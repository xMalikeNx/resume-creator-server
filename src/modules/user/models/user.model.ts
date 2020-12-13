import { Schema, Document, model, Model } from "mongoose";

export type UserDocument = {
  _id?: string;
  login: string;
  password: string;
} & Document;

export const UserSchema = new Schema({
  login: String,
  password: String,
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  profession: {
    type: String,
    required: false,
  },
  birthDate: {
    type: Date,
    required: false,
  },
});

export const UserModel = model<UserDocument>("user", UserSchema);
