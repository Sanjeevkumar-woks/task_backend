import mongoose from "mongoose";
import { TaskStatusEnum } from "../enums/task";

enum TaskPriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

interface ITask {
  title: string;
  createdBy: mongoose.Schema.Types.ObjectId | string;
  assignedTo?: mongoose.Schema.Types.ObjectId | string;
  dueDate?: Date;
  companyId: mongoose.Schema.Types.ObjectId | string;
  userId: string;
  priority?: TaskPriorityEnum;
  status: TaskStatusEnum;
  reminderStartDate?: Date;
}

export interface ITaskDocument extends ITask, Document {}

export const taskSchema = new mongoose.Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    assignedTo: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    companyId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      required: false,
    },
    reminderStartDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.Todo,
    },
  },
  {
    timestamps: true,
    collection: "Task",
  }
);

export const TaskName = "taskSchema";
