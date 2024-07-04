import { Router } from "express";
import asyncFunction from "express-async-handler";
import TaskController from "../controllers/taskControllers";
export const taskApis = Router();

taskApis.post("/createTask", asyncFunction(TaskController.createTask));

taskApis.get("/getTasks", asyncFunction(TaskController.getTasks));

taskApis.put("/updateTask", asyncFunction(TaskController.updateTask));

taskApis.delete("/deleteTask", asyncFunction(TaskController.bulkDeletedTasks));
