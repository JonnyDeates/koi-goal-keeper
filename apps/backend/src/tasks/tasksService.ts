import {type Request} from "express";
import {
    GoalType,
    TaskEntityType, TaskListType,
    TaskType,
    UpdatableGoalEntityType,
    UpdatableGoalType,
    UpdatableTaskEntityType, UpdatableTaskType
} from "@repo/types";
import {buildTask} from "@repo/utils"
import Database from "../utils/database/Database";
import tasksRepo from "./tasksRepo";
import goalsRepo from "../goals/goalsRepo";

const tasksService = {
    create: async (req: Request, goalId: number): Promise<TaskType> => {
        const database = Database.get(req);

        const task = buildTask();

        const newTask: Omit<TaskEntityType, 'id' | 'date_modified'> = {
            is_completed: task.isCompleted,
            date_created: new Date(),
            goal_id: goalId,
            name: task.name
        }

        const savedTaskEntity = await tasksRepo.save(database, newTask);

        return {
            ...task,
            id: savedTaskEntity.id,
        }
    },
    update: async (req: Request, goalId: number, taskId: number, task: UpdatableTaskType): Promise<void> => {
        const database = Database.get(req);

        const updatablePortionsOfTask: UpdatableTaskEntityType = {}

        if (task.name) updatablePortionsOfTask.name = task.name
        if (typeof task.isCompleted === 'boolean') updatablePortionsOfTask.is_completed = task.isCompleted

        await tasksRepo.update(database, goalId, taskId, updatablePortionsOfTask)

    },
    remove: async (req: Request, id: number) => {
        const database = Database.get(req);

        await tasksRepo.delete(database, id);
    },
    toggleAll: async (req: any, goalId: number): Promise<TaskListType> => {
        const database = Database.get(req);

        const taskEntities = await tasksRepo.toggleAll(database, goalId);

        return taskEntities.reduce((taskListObject, taskEntity) => {
            taskListObject[taskEntity.id.toString()] = {
                name: taskEntity.name,
                isEditing: false,
                isCompleted: taskEntity.is_completed,
                id: taskEntity.id
            }
            return taskListObject;
        }, {} as TaskListType)

    }
};
export default tasksService;