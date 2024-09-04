import nodemailer from "nodemailer";
import config from "../../../config";

const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {user: config.EMAIL_USERNAME_SECRET, pass: config.EMAIL_PASS_SECRET},
    tls: {
        rejectUnauthorized: false
    }
});
export default emailTransporter