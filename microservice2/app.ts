import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import * as dotenv from "dotenv";
import bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "*",
  })
);

/* setup middlewares */
app.use(morgan("dev"));

/* setup routes */
import transactionsRoutes from "./routes/transactions.routes";
app.use("/api/v1/transactions", transactionsRoutes);

app.get("/", (req: Request, res: Response) => {
  res
    .json({
      message: `hello, this microservice 2`,
      statusCode: 200,
    })
    .status(200);
});

app.get("/health", (req: Request, res: Response) => {
  res
    .json({
      message: "ok",
      statusCode: 200,
    })
    .status(200);
});

app.get("*", function (req: Request, res: Response) {
  res
    .json({
      message: "not found",

      statusCode: 404,
    })
    .status(404);
});

export default app;
