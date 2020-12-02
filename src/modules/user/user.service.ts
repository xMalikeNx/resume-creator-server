import bcrypt from "bcrypt";

import { HttpError } from "../../utils/HttpError";
import { UserDocument, UserModel } from "./models/user.model";
import { CreateUserDto } from "./user.dto";

export class UserService {
  createUser = async (createUserDto: CreateUserDto) => {
    const existingUser = await UserModel.findOne({
      login: createUserDto.login,
    });
    if (existingUser) {
      throw new HttpError("User with that login already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await UserModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await newUser.save();
    return this.prepareUser(newUser);
  };

  prepareUser = (user: UserDocument) => {
    const userObject = user.toObject();
    // @ts-ignore
    delete userObject.password;
    return userObject;
  };
}
