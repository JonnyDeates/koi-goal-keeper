import {type NextFunction, type Request, type Response} from "express";


const validKeysInRequest = (...fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Specifies the Missing Fields
    if (!req.body) {
        return res.status(403).json({error: `The post request is missing a body.`}).end();
    }
    const collectFields: string[] = [];
    for (const field of fields) {
        if (!req.body[field]) {
            collectFields.push(field);
        }
    }
    if (collectFields.length > 0) {
        return res.status(403).json({
            error: collectFields.reduce<Record<string, string>>((errorObj, key) => ({...errorObj, [key]: `No ${key} entered.`}),
                {})
        }).end();
    }
    next();
};

export default validKeysInRequest;