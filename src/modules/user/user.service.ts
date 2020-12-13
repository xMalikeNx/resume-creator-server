import bcrypt from "bcrypt";

import { UserDocument, UserModel } from "./models/user.model";
import { HttpError } from "../../utils/HttpError";
import { CreateUserDto, UpdateProfileDto } from "./user.dto";
import { parseDate } from "../../utils/date-helpers";

export class UserService {
  createUser = async (createUserDto: CreateUserDto) => {
    const existingUser = await UserModel.findOne({
      login: createUserDto.login,
    });
    if (existingUser) {
      throw new HttpError(`Логин ${createUserDto.login} уже занят`, 400);
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

  updateProfile = async (
    userId: string,
    updateProfileDto: UpdateProfileDto
  ) => {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new HttpError("Пользователь не найден", 404);
    }

    await user.set({
      ...updateProfileDto,
      birthDate: parseDate(updateProfileDto.birthDate),
    });
    await user.save();
    return this.prepareUser(user);
  };
}
