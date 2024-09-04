import knex from "knex";
import config from "../config";

const knexDatabase = knex({
        client: 'pg',
        connection: {
            connectionString: config.DATABASE_URL,
            ssl: false
        },
        migrations: {
            tableName: 'migrations'
        }
    });
export default knexDatabase;