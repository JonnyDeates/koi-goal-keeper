import {ErrorType} from "@repo/types";

export type ErrorDTOType = {error: ErrorType | string}

export const buildError = (value: ErrorType | string):ErrorDTOType => {
    return {error: value}
}

export function buildErrorDTO<T extends string | number | symbol>(key: T, value: string): ErrorDTOType {
    const newErrorObj: ErrorType<T> = {}
    newErrorObj[key] = value;

    return buildError(newErrorObj)
}

