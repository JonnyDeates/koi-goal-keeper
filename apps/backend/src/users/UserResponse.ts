import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";
import {ErrorMappingType, GenericResponse, SuccessMappingType} from "../utils/GenericResponse/GenericResponse";

export enum UserFailureTypes {
    USER_NOT_FOUND = "The user was not found.",
    USER_PASSWORD_IS_INVALID = "The password provided is invalid.",
}

export enum UserSuccessTypes {
    USER_DETAILS = "Get user details.",
    USER_REMOVED = "The user was deleted.",
    USER_UPDATED = "The user was updated.",
}

export const UserFailureMappings: ErrorMappingType<UserFailureTypes> = {
    [UserFailureTypes.USER_NOT_FOUND]: {
        statusCode: StatusCodes.NOT_FOUND,
        body: buildError(UserFailureTypes.USER_NOT_FOUND)
    },
    [UserFailureTypes.USER_PASSWORD_IS_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildErrorDTO("password", UserFailureTypes.USER_PASSWORD_IS_INVALID)
    }
};

export const UserSuccessMappings: SuccessMappingType<UserSuccessTypes> = {
    [UserSuccessTypes.USER_DETAILS]: StatusCodes.OK,
    [UserSuccessTypes.USER_REMOVED]: StatusCodes.NO_CONTENT,
    [UserSuccessTypes.USER_UPDATED]: StatusCodes.OK,
};

export const UserResponse = new GenericResponse(UserFailureMappings, UserSuccessMappings)