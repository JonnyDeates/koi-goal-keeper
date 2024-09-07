import {StatusCodes} from "http-status-codes";
import {Response} from "express";
import {ErrorDTOType} from "../builders/buildErrorResponseDTO";
import {sendResponse} from "./sendResponse";



export type ErrorBodyType = { statusCode: StatusCodes, body: ErrorDTOType }
export type ErrorMappingType<T extends string | number | symbol> ={ [key in T]:  ErrorBodyType};
export type SuccessMappingType<K extends string | number | symbol> = { [key in K]: StatusCodes }

export class GenericResponse<T extends string | number | symbol, K extends string | number | symbol> {
    errorMappings: ErrorMappingType<T>
    successMappings: SuccessMappingType<K>

    constructor(errorMappings: ErrorMappingType<T>, successMapping: SuccessMappingType<K>) {
        this.errorMappings = errorMappings
        this.successMappings = successMapping
    }

    failed(res: Response, typeOfResponse: T) {
        const { statusCode, body } = this.errorMappings[typeOfResponse];
        return sendResponse(res, statusCode, body);
    }
    succeeded(res: Response, typeOfResponse: K, body: Record<string, any> = {}) {
        const statusCode = this.successMappings[typeOfResponse] || StatusCodes.OK;
        return sendResponse(res, statusCode, { ...body, success: true, });
    }
}