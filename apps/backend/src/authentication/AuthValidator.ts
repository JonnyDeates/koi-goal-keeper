import {type NextFunction, type Request, type Response} from "express";
import {validateEmail, validatePassword} from "@repo/utils";
import {StatusCodes} from "http-status-codes";
import {sendResponse} from "../utils/GenericResponse/sendResponse";
import {buildError, buildErrorDTO} from "../utils/builders/buildErrorResponseDTO";

export const isPasswordValid = (req: Request, res: Response, next: NextFunction) => {
    const decryptedPassword = atob(req.body.password);
    const passwordResponse = validatePassword(decryptedPassword);

    if (passwordResponse)
        return sendResponse(res, StatusCodes.BAD_REQUEST, buildErrorDTO("password", passwordResponse));

    next();
};
export const isEmailValid = (req: Request, res: Response, next: NextFunction) => {
    const emailResponse = validateEmail(req.body.email);

    if (emailResponse)
        return sendResponse(res, StatusCodes.BAD_REQUEST, buildErrorDTO("email", emailResponse));

    next();
};

export const requireUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user)
        return sendResponse(res, StatusCodes.UNAUTHORIZED, buildError('Unauthorized request'));

    // Any actions the user makes resets their session age.
    req.session.resetMaxAge();

    next();
};