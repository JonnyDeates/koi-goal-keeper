import {NextFunction, Request, Response} from "express";
import {sendResponse} from "../utils/GenericResponse/sendResponse";
import {StatusCodes} from "http-status-codes";
import {buildError} from "../utils/builders/buildErrorResponseDTO";

export const requireUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user)
        return sendResponse(res, StatusCodes.UNAUTHORIZED, buildError('Unauthorized request'));

    return next();
};