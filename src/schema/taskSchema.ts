import mongoose from "mongoose";
import { required } from "joi";

enum TaskPriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

interface ITask {
  title: string;
  createdBy: string;
  assignedTo?: string;
  dueDate?: Date;
  projectId: string;
  userId: string;
  priority?: TaskPriorityEnum;
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
      type: String,
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
    projectId: {
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
  },
  {
    timestamps: true,
    collection: "Task",
  }
);

export const TaskName = "taskSchema";
