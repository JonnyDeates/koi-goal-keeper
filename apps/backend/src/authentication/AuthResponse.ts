import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";
import {ErrorMappingType, GenericResponse, SuccessMappingType} from "../utils/GenericResponse/GenericResponse";

export enum AuthFailureTypes {
    USER_ALREADY_EXISTS = "User already exists! Login or choose another email.",
    SESSION_FAILED_TO_SAVE = "Error saving session.",
    SESSION_IS_INVALID = "No session found.",
    USER_NOT_FOUND = "No user found.",
    PASSWORD_IS_INVALID = "Password is invalid.",
    TOKEN_FAILED_TO_SEND_TO_EMAIL = "The token generated failed to send to the email requested.",
    TOKEN_HAS_EXPIRED = "Token has expired.",
    TOKEN_IS_INVALID = "Token is invalid."
}

export enum AuthSuccessTypes {
    USER_LOGS_IN = "User logged in.",
    TOKEN_GENERATED_AND_EMAIL_SENT = "The token was generated and the email was sent to user",
    SESSION_IS_VALID = "Session is valid."
}

export const AuthErrorMappings: ErrorMappingType<AuthFailureTypes> = {
    [AuthFailureTypes.USER_ALREADY_EXISTS]: {
        statusCode: StatusCodes.CONFLICT,
        body: buildErrorDTO("email", AuthFailureTypes.USER_ALREADY_EXISTS)
    },
    [AuthFailureTypes.USER_NOT_FOUND]: {
        statusCode: StatusCodes.NOT_FOUND,
        body: buildErrorDTO("email", AuthFailureTypes.USER_NOT_FOUND)
    },
    [AuthFailureTypes.SESSION_FAILED_TO_SAVE]: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: buildError(AuthFailureTypes.SESSION_FAILED_TO_SAVE)
    },
    [AuthFailureTypes.TOKEN_FAILED_TO_SEND_TO_EMAIL]: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body:  buildError(AuthFailureTypes.TOKEN_FAILED_TO_SEND_TO_EMAIL)
    },
    [AuthFailureTypes.TOKEN_IS_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildError(AuthFailureTypes.TOKEN_IS_INVALID)
    },
    [AuthFailureTypes.TOKEN_HAS_EXPIRED]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildError(AuthFailureTypes.TOKEN_HAS_EXPIRED)
    },
    [AuthFailureTypes.PASSWORD_IS_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildErrorDTO("password", AuthFailureTypes.PASSWORD_IS_INVALID)
    },
    [AuthFailureTypes.SESSION_IS_INVALID]: {
        statusCode: StatusCodes.UNAUTHORIZED,
        body: buildError(AuthFailureTypes.SESSION_IS_INVALID)
    }
};

// Success response mappings
export const AuthSuccessMappings: SuccessMappingType<AuthSuccessTypes> = {
    [AuthSuccessTypes.USER_LOGS_IN]: StatusCodes.OK,
    [AuthSuccessTypes.TOKEN_GENERATED_AND_EMAIL_SENT]: StatusCodes.ACCEPTED,
    [AuthSuccessTypes.SESSION_IS_VALID]: StatusCodes.OK,
};

export const AuthResponse = new GenericResponse(AuthErrorMappings, AuthSuccessMappings);
