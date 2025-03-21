import * as process from "node:process";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    DATABASE_IP: process.env.DATABASE_IP || 'localhost',
    DATABASE_NAME: process.env.DATABASE_NAME || "db",
    DATABASE_PORT: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
    POSTGRES_USER: process.env.POSTGRES_USER  || "postgres",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    SESSION_SECRET: process.env.SESSION_SECRET || 'kingpendata',
    EMAIL_USERNAME_SECRET: process.env.EMAIL_USERNAME_SECRET || 'jonnydeates@gmail.com',
    EMAIL_PASS_SECRET: process.env.EMAIL_PASS_SECRET || ''
};
export const allowedOrigins = config.NODE_ENV === 'development'
    ? ['http://localhost:8000', 'http://localhost:8001', 'http://localhost:5002', 'http://localhost:5000']
    : ['https://www.koigoalkeeper.com', 'https://koigoalkeeper.com'];


export default config;
