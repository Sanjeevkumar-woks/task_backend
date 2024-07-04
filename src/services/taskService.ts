import mongoose from "mongoose";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task";
import { TaskModel } from "../models/taskModel";
import { ITaskDocument } from "../schema/taskSchema";
import _, { filter } from "lodash";
import createHttpError from "http-errors";

export default class TaskService {
  static async createTask(payload: {
    title: string;
    createdBy: string;
    assignedTo?: string;
    dueDate?: Date;
    companyId: string;
    userId: string;
    priority?: TaskPriorityEnum;
    reminderStartDate?: Date;
  }) {
    const response = await TaskModel.create(payload);
  }

  static async getTasks(payload: {
    page: number;
    size: number;
    filters: {
      assignedTo?: string[];
      createdBy?: string[];
    };
    searchKeyword?: string;
    companyId: string;
    userId: string;
  }) {
    const {
      page = 1,
      size = 20,
      filters,
      searchKeyword,
      companyId,
      userId,
    } = payload;

    const query: mongoose.FilterQuery<ITaskDocument> = {
      companyId,
    };

    if (!_.isEmpty(searchKeyword)) {
      query["title"] = { $regex: searchKeyword, $options: "i" };
    }

    if (filters?.assignedTo) {
      query["assignedTo"] = { $in: filters?.assignedTo };
    }

    if (filters?.createdBy) {
      query["createdBy"] = { $in: filters?.createdBy };
    }
    const [tasks, totalTasks] = await Promise.all([
      TaskModel.find(query)
        .skip((page - 1) * size)
        .limit(size)
        .sort({ createdAt: -1 })
        .lean(),
      TaskModel.countDocuments(query),
    ]);

    return {
      tasks,
      totalCount: totalTasks,
    };
  }

  static async updateTask(payload: {
    taskId: string;
    title: string;
    assignedTo?: string;
    dueDate?: Date;
    status?: TaskStatusEnum;
    companyId: string;
    userId: string;
    priority?: TaskPriorityEnum;
    reminderStartDate?: Date;
  }) {
    const {
      taskId,
      title,
      assignedTo,
      dueDate,
      status,
      companyId,
      userId,
      priority,
      reminderStartDate,
    } = payload;

    const task = await TaskModel.findOne({ _id: taskId, companyId });

    if (!task) {
      throw new createHttpError.NotFound("Task not found");
    }

    const response = await TaskModel.updateOne(
      {
        _id: taskId,
        companyId,
      },
      {
        title,
        assignedTo,
        dueDate,
        status,
        priority,
        reminderStartDate,
      }
    );
    return response;
  }

  static async bulkDeleteTasks(payload: {
    taskIds: string[];
    companyId: string;
    userId: string;
  }) {
    const { taskIds, companyId, userId } = payload;

    const tasks = await TaskModel.find({
      _id: { $in: taskIds },
      companyId,
    });

    if (tasks.length === 0) {
      throw new createHttpError.BadRequest("No Tasks found");
    }

    await TaskModel.deleteMany({ _id: { $in: taskIds } });

    return {
      message: `${tasks.length} tasks deleted `,
    };
  }
}
