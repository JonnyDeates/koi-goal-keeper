import {type Request} from "express";
import {
    GoalEntityType,
    GoalListType,
    GoalType,
    TaskEntityType, TaskListType, TaskType,
    UpdatableGoalEntityType,
    UpdatableGoalType
} from "@repo/types";
import {buildGoal, buildTask} from "@repo/utils"
import Database from "../utils/database/Database";
import goalsRepo from "./goalsRepo";
import tasksRepo from "../tasks/tasksRepo";

const goalsService = {
    create: async (req: Request, userId: number): Promise<GoalType> => {
        const database = Database.get(req);

        const goal = buildGoal();

        const newGoal: Omit<GoalEntityType, 'id' | 'date_modified'> = {
            completion_date: goal.completionDate,
            date_created: goal.createdDate,
            is_favorite: goal.isFavorite,
            name: goal.name,
            user_id: userId
        }

        const savedGoalEntity = await goalsRepo.save(database, newGoal);

        const task = buildTask()

        const newTask: Omit<TaskEntityType, 'id' | 'date_modified'> = {
            name: task.name,
            is_completed: task.isCompleted,
            goal_id: savedGoalEntity.id,
            date_created: goal.createdDate
        }
        const savedTaskEntity = await tasksRepo.save(database, newTask);

        return {
            ...goal,
            id: savedGoalEntity.id,
            tasks: {
                [savedTaskEntity.id]: {...task, id: savedTaskEntity.id}
            }
        }
    },
    duplicate: async (req: Request, userId: number, goalToBeDuplicated: GoalType): Promise<GoalType> => {
        const database = Database.get(req);

        const newGoal: Omit<GoalEntityType, 'id' | 'date_modified'> = {
            completion_date: goalToBeDuplicated.completionDate,
            date_created: new Date(),
            is_favorite: goalToBeDuplicated.isFavorite,
            name: goalToBeDuplicated.name,
            user_id: userId
        }

        const savedGoalEntity = await goalsRepo.save(database, newGoal);

        const tasksToBeSaved = Object.keys(goalToBeDuplicated.tasks)
            .reduce((array, taskId) => {
                    const task = goalToBeDuplicated.tasks[taskId] as TaskType
                    array.push({
                        name: task.name,
                        is_completed: task.isCompleted,
                        goal_id: savedGoalEntity.id,
                        date_created: savedGoalEntity.date_created
                    })
                    return array;
                }
                , [] as Omit<TaskEntityType, 'id' | 'date_modified'>[])

        const savedTaskEntities = await tasksRepo.saveAll(database, tasksToBeSaved);

        const {tasks, tasksCompleted} = savedTaskEntities
            .reduce(({tasks, tasksCompleted}, taskEntity) => {
                tasks[taskEntity.id] = {
                    name: taskEntity.name,
                    id: taskEntity.id,
                    isCompleted: taskEntity.is_completed,
                    isEditing: false
                }
                const isCompleted =  taskEntity.is_completed ? 1 : 0

                return {tasks, tasksCompleted: tasksCompleted + isCompleted};
            }, {tasks: {}, tasksCompleted: 0} as {tasks: TaskListType, tasksCompleted: number})

        return {
            name: savedGoalEntity.name,
            createdDate: savedGoalEntity.date_created,
            isFavorite: savedGoalEntity.is_favorite,
            isEditing: false,
            modifiedDate: new Date(),
            completionDate: savedGoalEntity.completion_date,
            id: savedGoalEntity.id,
            tasks,
            tasksCompleted
        }

    },
    find: async (req: Request, userId: number, goalId: number): Promise<GoalType | undefined> => {
        const database = Database.get(req);

        const goalTaskJoinedEntities = await goalsRepo.find(database, userId, goalId);
        let goal: GoalType | undefined = undefined

        for (let goalTaskEntity of goalTaskJoinedEntities) {
            if (!goal) {
                goal = {
                    id: goalId,
                    name: goalTaskEntity.name,
                    createdDate: goalTaskEntity.date_created,
                    isFavorite: goalTaskEntity.is_favorite,
                    modifiedDate: goalTaskEntity.date_modified,
                    completionDate: goalTaskEntity.completion_date,
                    tasksCompleted: 0,
                    isEditing: false,
                    tasks: {}
                };
            }

            if (goalTaskEntity.task_id) {
                goal.tasks[goalTaskEntity.task_id] = {
                    id: goalTaskEntity.task_id,
                    name: goalTaskEntity.task_name,
                    isCompleted: goalTaskEntity.task_is_completed,
                    isEditing: false
                }
                if (goalTaskEntity.task_is_completed) {
                    goal.tasksCompleted += 1;
                }
            }
        }

        return goal;
    },
    findAll: async (req: Request, userId: number): Promise<GoalListType> => {
        const database = Database.get(req);

        const goalTaskJoinedEntity = await goalsRepo.findAll(database, userId);

        return goalTaskJoinedEntity.reduce((goalList, row) => {
            const goalId = row.id;

            if (!goalList[goalId]) {
                goalList[goalId] = {
                    id: goalId,
                    name: row.name,
                    createdDate: row.date_created,
                    isFavorite: row.is_favorite,
                    modifiedDate: row.date_modified,
                    completionDate: row.completion_date,
                    tasksCompleted: 0,
                    isEditing: false,
                    tasks: {}
                };
            }

            if (row.task_id) {
                goalList[goalId].tasks[row.task_id] = {
                    id: row.task_id,
                    name: row.task_name,
                    isCompleted: row.task_is_completed,
                    isEditing: false
                }
                if (row.task_is_completed) {
                    goalList[goalId].tasksCompleted += 1;
                }
            }

            return goalList;
        }, {} as GoalListType)
    },
    update: async (req: Request, goalToBeModified: GoalType, goal: UpdatableGoalType): Promise<void> => {
        const database = Database.get(req);

        const updatablePortionsOfGoal: UpdatableGoalEntityType = {}

        if (goal.name) updatablePortionsOfGoal.name = goal.name
        if (typeof goal.isFavorite === 'boolean') updatablePortionsOfGoal.is_favorite = goal.isFavorite
        if (goal.completionDate) updatablePortionsOfGoal.completion_date = goal.completionDate

        await goalsRepo.update(database, goalToBeModified.id, updatablePortionsOfGoal)

    },
    remove: async (req: Request, goalId: number): Promise<void> => {
        const database = Database.get(req);

        await goalsRepo.delete(database, goalId);
    }
};
export default goalsService;