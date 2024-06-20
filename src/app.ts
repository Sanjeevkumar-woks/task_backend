import express from "express";
import * as bodyPasser from "body-parser";
import cors from "cors";
import { healthCheck } from "./controllers/healthCheckControllers";
import { apis } from "./routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyPasser.json());

app.use("/task-service", apis);
app.use("/healthcheck", healthCheck);

process.on("uncaughtException", function (err: Error) {
  console.log("uncaughtException", err);
});

process.on("unhandledRejection", function (err: Error) {
  console.log("unhandledRejection", err);
});

export default app;
