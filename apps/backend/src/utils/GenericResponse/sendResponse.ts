import {type Response} from "express";
import {type StatusCodes} from "http-status-codes";

export const sendResponse = (res: Response, statusCode: StatusCodes, body: object) => {
    return res.status(statusCode).json(body);
};
