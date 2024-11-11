import {type NextFunction, type Request, type Response} from "express";
import {buildError} from "../builders/buildErrorResponseDTO";


const partialValidKeysInRequest = (...fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Specifies the Missing Fields
    if (!req.body) {
        res.status(403).json(
            buildError('The post request is missing a body.')
        ).end();
    } else {
        const collectFields: string[] = [];
        for (const field of fields) {
            if (!req.body[field] && typeof req.body[field] !== "boolean") {
                collectFields.push(field);
            }
        }
        if (collectFields.length === fields.length) {
            res.status(403).json(
                buildError(`No valid key entered, valid entries are: ${collectFields.join(', ')}`)
            ).end();
        } else {
            next();

        }
    }

};

export default partialValidKeysInRequest;
