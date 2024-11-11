import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";
import {type ErrorMappingType, GenericResponse, type SuccessMappingType} from "../utils/GenericResponse/GenericResponse";

export enum TaskFailureTypes {
    USER_NOT_FOUND = "The user was not found.",
    USER_PASSWORD_IS_INVALID = "The password provided is invalid.",
}

export enum TaskSuccessTypes {
    TASK_CREATED = "the task was created.",
    TASK_REMOVE = "The task was deleted.",
    TASK_UPDATED = "The task was updated.",
}

export const TaskFailureMappings: ErrorMappingType<TaskFailureTypes> = {
    [TaskFailureTypes.USER_NOT_FOUND]: {
        statusCode: StatusCodes.NOT_FOUND,
        body: buildError(TaskFailureTypes.USER_NOT_FOUND)
    },
    [TaskFailureTypes.USER_PASSWORD_IS_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildErrorDTO("password", TaskFailureTypes.USER_PASSWORD_IS_INVALID)
    }
};

export const TaskSuccessMappings: SuccessMappingType<TaskSuccessTypes> = {
    [TaskSuccessTypes.TASK_CREATED]: StatusCodes.CREATED,
    [TaskSuccessTypes.TASK_REMOVE]: StatusCodes.NO_CONTENT,
    [TaskSuccessTypes.TASK_UPDATED]: StatusCodes.OK,
};

export const TasksResponse = new GenericResponse(TaskFailureMappings, TaskSuccessMappings);