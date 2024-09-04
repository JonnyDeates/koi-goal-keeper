import {NextFunction, Request, Response} from "express";


const validKeysInRequest = (...fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // Specifies the Missing Fields
    if (!req.body) {
        return res.status(403).json({error: `The post request is missing a body.`}).end();
    }
    const collectFields = [];
    for (const field of fields) {
        if (!req.body[field]) {
            collectFields.push(field)
        }
    }
    if (collectFields.length > 0) {
        return res.status(403).json({
            error: collectFields.reduce((errorObj, key) => ({...errorObj, [key]: `No ${key} entered.`}),
                {} as Record<string, string>)
        }).end();
    }
    return next();
}

export default validKeysInRequest