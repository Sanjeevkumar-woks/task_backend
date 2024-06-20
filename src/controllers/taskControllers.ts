import { Request, Response } from "express";
import { validateJoiSchema } from "../schema/validationSchema";
import Joi from "joi";
import { TaskPriorityEnum } from "../enums/task";
import TaskService from "../services/taskService";

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    console.log(req.body);
    validateJoiSchema({
      schema: Joi.object({
        projectId: Joi.string().optional().allow(""),
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
      createdBy: req.body?.userId as string,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      projectId: req.body.projectId as string,
      userId: req.body?.userId as string,
      priority: req.body.priority,
      reminderStartDate: req.body.reminderStartDate,
    });

    res.send({ message: "Task created successfully" });
  }
}
