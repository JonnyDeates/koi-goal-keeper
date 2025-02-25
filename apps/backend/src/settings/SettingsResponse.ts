import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";
import {type ErrorMappingType, GenericResponse, type SuccessMappingType} from "../utils/GenericResponse/GenericResponse";

export enum SettingFailureTypes {
    PARAMETER_INVALID = "The supplied parameter was invalid.",
}

export enum SettingSuccessTypes {
    SETTING_UPDATED = "Updated the Setting.",
}

export const SettingFailureMappings: ErrorMappingType<SettingFailureTypes> = {
    [SettingFailureTypes.PARAMETER_INVALID]: {
        statusCode: StatusCodes.BAD_REQUEST,
        body: buildError(SettingFailureTypes.PARAMETER_INVALID)
    },
};

export const SettingSuccessMappings: SuccessMappingType<SettingSuccessTypes> = {
    [SettingSuccessTypes.SETTING_UPDATED]: StatusCodes.OK,
};

export const SettingsResponse = new GenericResponse(SettingFailureMappings, SettingSuccessMappings);
