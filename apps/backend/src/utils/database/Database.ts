import {type Request} from "express";
import {type Knex} from "knex";

const Database = {
    get: (req: Request) => {
        return req.app.get('database') as Knex;
    }
};
export default Database;