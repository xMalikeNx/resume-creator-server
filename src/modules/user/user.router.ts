import { Request, Response, Router } from "express";

import { createUserDtoValidationMiddleware } from "./middlewares/createUserDtoValidationMiddleware";
import { ResponseCreator } from "../../utils/ResponseCreator";
import { errorResponse } from "../../utils/errorResponse";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateProfileDto } from "./user.dto";
import { AuthorizedRequest } from "../../types/types";
import { updateProfileDtoValidationMiddleware } from "./middlewares/updateProfileDtoValidationMiddleware";
import { accessMiddleware } from "../../middlewares/accessMiddleware";

const userRouter = Router();
const userService = new UserService();

userRouter.get("/", (req, res) => {
  res.send("user router");
});

userRouter.post(
  "/",
  [createUserDtoValidationMiddleware],
  async (req: Request, res: Response) => {
    try {
      const createUserDto = req.body as CreateUserDto;
      const result = await userService.createUser(createUserDto);
      res.json(ResponseCreator.createSuccessResponse(result));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

userRouter.put(
  "/",
  [accessMiddleware, updateProfileDtoValidationMiddleware],
  async (req: AuthorizedRequest, res: Response) => {
    try {
      const updateProfileDto = req.body as UpdateProfileDto;
      const userId = req.params.userId;
      const updatedProfile = await userService.updateProfile(
        userId,
        updateProfileDto
      );
      res.json(ResponseCreator.createSuccessResponse(updatedProfile));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

export default userRouter;
