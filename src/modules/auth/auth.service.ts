import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HttpError } from "../../utils/HttpError";
import { UserModel } from "../user/models/user.model";
import { LoginDto } from "./auth.dto";

export class AuthService {
  login = async (loginDto: LoginDto): Promise<string> => {
    const { login, password } = loginDto;
    const user = await UserModel.findOne({ login });

    if (!user) {
      throw new HttpError("Логин или пароль введены не верно", 400);
    }

    const isCompare = await bcrypt.compare(password, user.password);
    if (!isCompare) {
      throw new HttpError("Логин или пароль введены не верно", 400);
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );

    return token;
  };

  getProfile = async (userId: string) => {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    const userObject = user.toObject();
    // @ts-ignore
    delete userObject.password;
    return userObject;
  };
}
