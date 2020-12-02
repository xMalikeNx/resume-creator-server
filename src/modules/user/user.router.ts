import { Request, Response, Router } from "express";

import { createUserDtoValidationMiddleware } from "./middlewares/createUserDtoValidationMiddleware";
import { ResponseCreator } from "../../utils/ResponseCreator";
import { errorResponse } from "../../utils/errorResponse";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";

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

export default userRouter;
