import {Response} from "express";
import {StatusCodes} from "http-status-codes";

export const sendResponse = (res: Response, statusCode: StatusCodes, body: object) => {
    return res.status(statusCode).json(body);
};
