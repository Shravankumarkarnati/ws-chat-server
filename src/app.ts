import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./model/dbConnection";

dotenv.config({ path: "./.env" });

const expressApp = Express();

expressApp.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`);
});

expressApp.get("/", (req: Request, res: Response) => {
  res.send({
    name: "wschat",
  });
});

const mongoURL = process.env.MONGO_DB_URL as string;

const dbConnection = dbConnect(mongoURL);

export default expressApp;
