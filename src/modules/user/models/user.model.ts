import { Schema, Document, model, Model } from "mongoose";

export type UserDocument = {
  login: string;
  password: string;
} & Document;

export const UserSchema = new Schema({
  login: String,
  password: String,
});

export const UserModel = model<UserDocument>("user", UserSchema);
