import { Request, Response, Router } from "express";
import userModel, { IUserDetails } from "../../model/user.schema";

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
      });
    })
    .catch((err) => {
      res.status(409);
      res.send({
        message: "This username already exists",
        error: err,
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
