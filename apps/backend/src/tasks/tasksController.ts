import express from "express";
import tasksService from "./tasksService";
import {TasksResponse, TaskSuccessTypes} from "./TasksResponse";
import {requireUserLoggedIn} from "../authentication/AuthValidator";
import goalsService from "../goals/goalsService";
import {GoalFailureTypes, GoalsResponse, GoalSuccessTypes} from "../goals/GoalsResponse";
import {UpdatableGoalType, UpdatableTaskType, User} from "@repo/types";
import partialValidKeysInRequest from "../utils/validKeysInRequest/partialValidKeysInRequest";

const tasksController = express.Router();


tasksController
    .route('/')
    .all(requireUserLoggedIn)
// .get((req, res) => {
//         const user = req.session.user as User;
//
//         return GoalsResponse.succeeded(res, GoalSuccessTypes.USER_DETAILS, user);
//     }
// )

// .patch(validKeysInRequest('name'), async (req, res, next) => {
//     const {name} = req.body;{
//     const {id} = req.session.user!;
//
//     await goalsService.setNameOnUser(req, id, name);
//
//     return GoalsResponse.succeeded(res, GoalSuccessTypes.USER_UPDATED);
//
// })

tasksController
    .route('/:goalId')
    .all(requireUserLoggedIn)
    .post(async (req, res, next) => {
        const {id} = req.session.user!;
        const goalId = parseInt(req.params.goalId);

        if (isNaN(goalId)) {
            GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
        } else {
            const goalToBeModified = await goalsService.find(req, id, goalId)

            if (!goalToBeModified) {
                GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
            } else {
                const task = await tasksService.create(req, goalToBeModified.id);

                TasksResponse.succeeded(res, TaskSuccessTypes.TASK_CREATED, {task});
            }
        }
    })
tasksController
    .route('/:goalId/toggle')
    .all(requireUserLoggedIn)
    .get(async (req, res, next) => {
        const {id} = req.session.user!;
        const goalId = parseInt(req.params.goalId);

        if (isNaN(goalId)) {
            GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
        } else {
            const goalToBeModified = await goalsService.find(req, id, goalId)

            if (!goalToBeModified) {
                GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
            } else {
                const taskList = await tasksService.toggleAll(req, goalToBeModified.id);

                TasksResponse.succeeded(res, TaskSuccessTypes.TASK_CREATED, {taskList});
            }
        }
    })
tasksController
    .route('/:goalId/:taskId')
    .all(requireUserLoggedIn)
    .patch(partialValidKeysInRequest('name', 'isCompleted'), async (req, res, next) => {
        const {id} = req.session.user!;
        const task = req.body as UpdatableTaskType;
        const goalId = parseInt(req.params.goalId);
        const taskId = parseInt(req.params.taskId);

        if (isNaN(goalId) || isNaN(taskId)) {
            GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
        } else {
            const goalToBeModified = await goalsService.find(req, id, goalId)

            if (!goalToBeModified) {
                GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
            } else {
                await tasksService.update(req, goalToBeModified.id, taskId, task);

                TasksResponse.succeeded(res, TaskSuccessTypes.TASK_CREATED, );
            }
        }
    })
    .delete(async (req, res) => {
            const {id} = req.session.user as User;

        const goalId = parseInt(req.params.goalId);
        const taskId = parseInt(req.params.taskId);

        if (isNaN(goalId) || isNaN(taskId)) {
                GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
            } else {
                const goalToBeDeleted = await goalsService.find(req, id, goalId)

                if (!goalToBeDeleted) {
                    GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
                } else {
                    await tasksService.remove(req, taskId);

                    TasksResponse.succeeded(res, TaskSuccessTypes.TASK_REMOVE);
                }
            }

        }
    )
export default tasksController;
