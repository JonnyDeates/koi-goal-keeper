import helmet from "helmet";
import config from "../config";

const helmetConfig = () => {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: "'self'",
                manifestSrc: "'self' data:",
            }
        }
    })
};
export default helmetConfig;