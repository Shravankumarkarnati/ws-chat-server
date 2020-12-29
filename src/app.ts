import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnect } from "./model/dbConnection";
import searchApi from "./routes/search";
import userApi from "./routes/user";

dotenv.config({ path: "./.env" });

const expressApp = Express();

expressApp.use(bodyParser.json());
expressApp.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

expressApp.use(helmet());
expressApp.use(morgan("common"));

expressApp.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port ${process.env.SERVER_PORT}`);
});

expressApp.get("/", (_: Request, res: Response) => {
  res.send({
    name: "wschat",
  });
});

dbConnect(process.env.MONGO_DB_URL as string);

expressApp.use("/api", userApi);
expressApp.use("/api", searchApi);

export default expressApp;
