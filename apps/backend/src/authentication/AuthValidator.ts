import {NextFunction, Request, Response} from "express";
import {validateEmail, validatePassword} from "@repo/utils";
import {sendResponse} from "../utils/GenericResponse/sendResponse";
import {StatusCodes} from "http-status-codes";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";

export const isPasswordValid = (req: Request, res: Response, next: NextFunction) => {
    const decryptedPassword = atob(req.body.password);
    const passwordResponse = validatePassword(decryptedPassword)

    if (passwordResponse)
        return sendResponse(res, StatusCodes.BAD_REQUEST, buildErrorDTO("password", passwordResponse));

    return next();
}
export const isEmailValid = (req: Request, res: Response, next: NextFunction) => {
    const emailResponse = validateEmail(req.body.email)

    if (emailResponse)
        return sendResponse(res, StatusCodes.BAD_REQUEST, buildErrorDTO("email", emailResponse));

    return next();
}

export const requireUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user)
        return sendResponse(res, StatusCodes.UNAUTHORIZED, buildError('Unauthorized request'));

    // Any actions the user makes resets their session age.
    req.session.resetMaxAge();

    return next();
};