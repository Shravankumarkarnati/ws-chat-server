import { Request, Response, Router } from "express";
import userModel, { IUserDetails } from "../model/user.schema";

const userApi = Router();

userApi.post("/register", (req: Request, res: Response) => {
  const userDetails: IUserDetails = req.body.data;
  console.log(userDetails);
  const newUser = new userModel({ ...userDetails });
  newUser
    .save()
    .then(() => {
      res.send({
        success: true,
        username: userDetails.username,
        id: userDetails.id,
      });
    })
    .catch((err: any) => {
      res.send({
        success: false,
        message: "This username already exists",
        error: err,
      });
    });
});

userApi.post("/login", async (req: Request, res: Response) => {
  const userDetails: IUserDetails = req.body.data;
  const user = await userModel.findOne({ username: userDetails.username });
  if (!user) {
    res.send({
      success: false,
      message: `No user found with Username: ${userDetails.username}`,
    });
    return;
  }

  if (userDetails.password !== user.password) {
    res.send({
      success: false,
      message: `Incorrect Password`,
    });
    return;
  }

  res.send({
    success: true,
    username: user.username,
    id: user.id,
  });
});

export default userApi;
