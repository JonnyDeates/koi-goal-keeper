import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";
import {type ErrorMappingType, GenericResponse, type SuccessMappingType} from "../utils/GenericResponse/GenericResponse";

export enum GoalFailureTypes {
    GOAL_NOT_FOUND = "The goal was not found.",
    PARAMETER_INVALID = "The supplied parameter was invalid.",
    UNAUTHORIZED = "The user is not authorized to modify this goal."
}

export enum GoalSuccessTypes {
    ALL_GOALS_RETRIEVED = "Found all goals for a user.",
    GOAL_RETRIEVED = "Found a goal.",
    GOAL_REMOVED = "A goal was deleted.",
    GOAL_UPDATED = "A goal was updated.",
    GOAL_CREATED = "A goal was created.",
}

export const GoalFailureMappings: ErrorMappingType<GoalFailureTypes> = {
    [GoalFailureTypes.GOAL_NOT_FOUND]: {
        statusCode: StatusCodes.NOT_FOUND,
        body: buildError(GoalFailureTypes.GOAL_NOT_FOUND)
    },
    [GoalFailureTypes.PARAMETER_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildErrorDTO("password", GoalFailureTypes.PARAMETER_INVALID)
    },
    [GoalFailureTypes.UNAUTHORIZED]: {
        statusCode: StatusCodes.UNAUTHORIZED,
        body: buildErrorDTO("password", GoalFailureTypes.UNAUTHORIZED)
    }
};

export const GoalSuccessMappings: SuccessMappingType<GoalSuccessTypes> = {
    [GoalSuccessTypes.ALL_GOALS_RETRIEVED]: StatusCodes.OK,
    [GoalSuccessTypes.GOAL_RETRIEVED]: StatusCodes.OK,
    [GoalSuccessTypes.GOAL_UPDATED]: StatusCodes.OK,
    [GoalSuccessTypes.GOAL_CREATED]: StatusCodes.CREATED,
    [GoalSuccessTypes.GOAL_REMOVED]: StatusCodes.NO_CONTENT,
};

export const GoalsResponse = new GenericResponse(GoalFailureMappings, GoalSuccessMappings);