import cors from "cors";
import {allowedOrigins} from "../config";

const corsConfig = () => cors(
    {
        origin (origin, callback) {
            // allow requests with no origin - like mobile apps, curl, postman
            if (!origin) { callback(null, true); return; }
            if (!allowedOrigins.includes(origin)) {
                const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                callback(new Error(msg), false); return;
            }
            callback(null, true);
        },
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
);
export default corsConfig;