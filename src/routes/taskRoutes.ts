import { Router } from "express";
import asyncFunction from "express-async-handler";
import TaskController from "../controllers/taskControllers";
export const taskApis = Router();

taskApis.post("/createTask", asyncFunction(TaskController.createTask));

taskApis.get("/", (req, res) => {
  res.send("hello sanjeevkumar");
});
