import { TaskPriorityEnum } from "../enums/task";
import { TaskModel } from "../models/taskModel";

export default class TaskService {
  static async createTask(payload: {
    title: string;
    createdBy: string;
    assignedTo?: string;
    dueDate?: Date;
    projectId: string;
    userId: string;
    priority?: TaskPriorityEnum;
    reminderStartDate?: Date;
  }) {
    const response = await TaskModel.create(payload);
  }
}
