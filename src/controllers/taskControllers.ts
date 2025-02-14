import { Request, Response } from "express";
import { validateJoiSchema } from "../schema/validationSchema";
import Joi from "joi";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task";
import TaskService from "../services/taskService";
import { join } from "lodash";

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    console.log(req.body);
    validateJoiSchema({
      schema: Joi.object({
        title: Joi.string().required(),
        assignedTo: Joi.string().optional().allow(null),
        dueDate: Joi.date().optional().allow(null),
        priority: Joi.string()
          .valid(
            TaskPriorityEnum.Low,
            TaskPriorityEnum.Medium,
            TaskPriorityEnum.High
          )
          .optional()
          .allow(null),
        reminderStartDate: Joi.date().optional().allow(null),
      }),
      data: req.body,
    });
    await TaskService.createTask({
      title: req.body.title,
      createdBy: "6672e401c35ea69e47f59641" as string,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      companyId: "6672e401c35ea69e47f59641" as string,
      userId: "6672e401c35ea69e47f59641" as string,
      priority: req.body.priority,
      reminderStartDate: req.body.reminderStartDate,
    });

    res.send({ message: "Task created successfully" });
  }

  static async getTasks(req: Request, res: Response) {
    validateJoiSchema({
      schema: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
        filters: Joi.object({
          assignedTo: Joi.array().items(Joi.string()).optional(),
          createdBy: Joi.array().items(Joi.string()).optional(),
        }).optional(),
        searchKeyword: Joi.string().optional().allow(""),
      }),
      data: req.query,
    });

    const data = await TaskService.getTasks({
      page: Number(req.query.page),
      size: Number(req.query.size),
      filters: req.query.filters as any,
      searchKeyword: req.query.searchKeyword as string,
      companyId: "6672e401c35ea69e47f59641" as string,
      userId: "6672e401c35ea69e47f59641" as string,
    });

    res.send(data);
  }

  static async updateTask(req: Request, res: Response) {
    console.log(req.body);
    validateJoiSchema({
      schema: Joi.object({
        taskId: Joi.string().required(),
        title: Joi.string().required(),
        assignedTo: Joi.string().optional().allow(null),
        dueDate: Joi.date().optional().allow(null),
        status: Joi.string()
          .valid(
            TaskStatusEnum.Todo,
            TaskStatusEnum.InProgress,
            TaskStatusEnum.Done,
            TaskStatusEnum.Freezed
          )
          .required(),
        priority: Joi.string()
          .valid(
            TaskPriorityEnum.Low,
            TaskPriorityEnum.Medium,
            TaskPriorityEnum.High
          )
          .optional()
          .allow(null),
        reminderStartDate: Joi.date().optional().allow(null),
      }),
      data: req.body,
    });

    await TaskService.updateTask({
      taskId: req.body.taskId,
      title: req.body.title,
      assignedTo: "6672e401c35ea69e47f59641",
      dueDate: req.body.dueDate,
      status: req.body.status,
      companyId: "6672e401c35ea69e47f59641" as string,
      userId: "6672e401c35ea69e47f59641" as string,
      priority: req.body.priority,
      reminderStartDate: req.body.reminderStartDate,
    });

    res.send({ message: "Task updated successfully" });
  }

  static async bulkDeletedTasks(req: Request, res: Response) {
    const { taskIds } = req.query;
    console.log(taskIds);
    const companyId = req.query.companyId as string;

    validateJoiSchema({
      schema: Joi.object({
        taskIds: Joi.array().items(Joi.string().hex().length(24).required()),
      }),
      data: req.query,
    });

    const result = await TaskService.bulkDeleteTasks({
      taskIds: taskIds as string[],
      companyId,
      userId: req.query.userId as string,
    });
    res.send(result);
  }
}
