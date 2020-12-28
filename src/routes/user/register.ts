import { Request, Response, Router } from "express";
import userModel, { IUserDetails } from "../../model/user.schema";

const userApi = Router();

userApi.post("/register", (req: Request, res: Response) => {
  const userDetails: IUserDetails = req.body;
  const newUser = new userModel({ ...userDetails });
  newUser.save().then(() => {
    res.send({
      success: true,
      username: userDetails.username,
    });
  });
});

userApi.post("/login", async (req: Request, res: Response) => {
  const userDetails: IUserDetails = req.body;
  const user = await userModel.findOne({ username: userDetails.username });

  if (!user) {
    res.status(404);
    res.send({
      error: `No user found with Username: ${userDetails.username}`,
    });
    return;
  }

  if (userDetails.password !== user.password) {
    res.status(406);
    res.send({
      error: `Incorrect Password`,
    });
    return;
  }

  res.send({
    success: true,
    username: user.username,
  });
});

export default userApi;
