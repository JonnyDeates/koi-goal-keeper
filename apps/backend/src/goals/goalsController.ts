import express from "express";
import goalsService from "./goalsService";
import {GoalFailureTypes, GoalsResponse, GoalSuccessTypes} from "./GoalsResponse";
import {GoalType, UpdatableGoalType, User} from "@repo/types";
import {requireUserLoggedIn} from "../authentication/AuthValidator";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import partialValidKeysInRequest from "../utils/validKeysInRequest/partialValidKeysInRequest";

const goalsController = express.Router();


goalsController
    .route('/')
    .all(requireUserLoggedIn)
    .get(async (req, res) => {
            const {id} = req.session.user!;

            const goalList = await goalsService.findAll(req, id);
            GoalsResponse.succeeded(res, GoalSuccessTypes.ALL_GOALS_RETRIEVED, {goalList});
        }
    )
    // .patch(validKeysInRequest('name'), async (req, res, next) => {
    //     const {name} = req.body;{
    //     const {id} = req.session.user!;
    //
    //     await goalsService.setNameOnUser(req, id, name);
    //
    //     return GoalsResponse.succeeded(res, GoalSuccessTypes.USER_UPDATED);
    //
    // })
    .post(async (req, res, next) => {
        const {id} = req.session.user!;

        const goal = await goalsService.create(req, id);

        GoalsResponse.succeeded(res, GoalSuccessTypes.GOAL_CREATED, goal);
    })

goalsController
    .route('/:id')
    .all(requireUserLoggedIn)
    .patch(partialValidKeysInRequest('name', 'completionDate', 'isFavorite'), async (req, res) => {
        const {id} = req.session.user as User;
        const goal = req.body as UpdatableGoalType;
        const goalId = parseInt(req.params.id);

        if (isNaN(goalId)) {
            GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
        } else {
            const goalToBeModified = await goalsService.find(req, id, goalId)

            if (!goalToBeModified) {
                GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
            } else {
                await goalsService.update(req, goalToBeModified, goal);

                GoalsResponse.succeeded(res, GoalSuccessTypes.GOAL_UPDATED);
            }
        }
    })
    .delete(async (req, res) => {
            const {id} = req.session.user as User;


            const goalId = parseInt(req.params.id);

            if (isNaN(goalId)) {
                GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
            } else {
                const goalToBeDeleted = await goalsService.find(req, id, goalId)

                if (!goalToBeDeleted) {
                    GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
                } else {
                    await goalsService.remove(req, goalId);

                    GoalsResponse.succeeded(res, GoalSuccessTypes.GOAL_REMOVED);

                }
            }
        }
    )
goalsController
    .route('/:id/duplicate')
    .all(requireUserLoggedIn)
    .get(async (req, res) => {
            const {id} = req.session.user!;
            const goalId = parseInt(req.params.id);

            if (isNaN(goalId)) {
                GoalsResponse.failed(res, GoalFailureTypes.PARAMETER_INVALID)
            } else {
                const goalToBeDuplicated = await goalsService.find(req, id, goalId)

                if (!goalToBeDuplicated) {
                    GoalsResponse.failed(res, GoalFailureTypes.GOAL_NOT_FOUND)
                } else {
                    const duplicatedGoal = await goalsService.duplicate(req, id, goalToBeDuplicated);
                    GoalsResponse.succeeded(res, GoalSuccessTypes.ALL_GOALS_RETRIEVED, {duplicatedGoal});
                }
            }
        }
    )
export default goalsController;
