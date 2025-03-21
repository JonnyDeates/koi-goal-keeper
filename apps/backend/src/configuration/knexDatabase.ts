import knex from "knex";
import config from "../config";

const knexDatabase = knex({
        client: 'pg',
        connection: {
            host: config.DATABASE_IP,
            database: config.DATABASE_NAME,
            password: config.POSTGRES_PASSWORD,
            port: config.DATABASE_PORT,
            user: config.POSTGRES_USER,
            ssl: false
        },
        migrations: {
            tableName: 'migrations'
        }
    });
export default knexDatabase;