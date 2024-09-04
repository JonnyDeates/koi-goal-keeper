import {Request} from "express";

const Database = {
    get: (req: Request) => {
        return req.app.get('database')
    }
};
export default Database