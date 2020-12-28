import bodyParser from "body-parser";
import dotenv from "dotenv";
import Express, { Request, Response } from "express";
import { dbConnect } from "./model/dbConnection";
import userApi from "./routes/user/register";

dotenv.config({ path: "./.env" });

const expressApp = Express();

expressApp.use(bodyParser.json());

expressApp.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`);
});

expressApp.get("/", (_: Request, res: Response) => {
  res.send({
    name: "wschat",
  });
});

const dbConnection = dbConnect(process.env.MONGO_DB_URL as string);

expressApp.use("/api", userApi);

export default expressApp;
