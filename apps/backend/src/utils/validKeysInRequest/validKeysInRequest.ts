import {type NextFunction, type Request, type Response} from "express";
import {buildError} from "../builders/buildErrorResponseDTO";


const validKeysInRequest = (...fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Specifies the Missing Fields
    if (!req.body) {
        res.status(403).json(buildError('The post request is missing a body.')).end();
    } else {

        const collectFields: string[] = [];
        for (const field of fields) {
            if (!req.body[field]) {
                collectFields.push(field);
            }
        }
        if (collectFields.length > 0) {
            res.status(403).json({
                error: collectFields.reduce<Record<string, string>>((errorObj, key) => ({
                        ...errorObj,
                        [key]: `No ${key} entered.`
                    }),
                    {})
            }).end();
        } else {
            next();
        }
    }

};

export default validKeysInRequest;