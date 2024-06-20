import mongoose from "mongoose";
import { ITaskDocument, TaskName, taskSchema } from "../schema/taskSchema";

export const TaskModel = mongoose.model<ITaskDocument>(TaskName, taskSchema);
