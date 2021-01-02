import { Request, Response, Router } from "express";
import userModel from "../model/user.schema";

const searchApi = Router();

searchApi.post("/search", (req: Request, res: Response) => {
  const { searchKeyWord } = req.body.data;
  if (searchKeyWord.length < 2) {
    res.send({
      success: true,
      results: [],
    });
  } else {
    const regex = new RegExp(searchKeyWord);
    userModel
      .find({ username: { $regex: regex, $options: "i" } })
      .then((response) => {
        res.send({
          success: true,
          results: response.map((cur) => [cur.username, cur.id]),
        });
      })
      .catch((err: Error) => {
        res.send({
          success: false,
          error: err.message,
        });
      });
  }
});

export default searchApi;
