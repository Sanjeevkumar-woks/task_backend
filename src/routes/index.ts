import { Router } from "express";
import { taskApis } from "./taskRoutes";
import { healthCheck } from "../controllers/healthCheckControllers";

export const apis = Router();
apis.use("/tasks", taskApis);
apis.use("/healthcheck", healthCheck);
