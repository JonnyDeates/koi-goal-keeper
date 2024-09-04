import config from "../../../config";
import emailTransporter from "../emailTransporter/emailTransporter";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type MailType = {to: string, subject: string, text: string, html?: string}

const sendMail = (mail: MailType, callback: (err: (Error | null), info: SMTPTransport.SentMessageInfo) => void) => {
    let mailToBeSent = {
        from: config.EMAIL_USERNAME_SECRET,
        ...mail
    };
    emailTransporter.sendMail(mailToBeSent, callback)
}
export default sendMail