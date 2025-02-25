import express from "express";
import usersService from "../users/usersService";
import buildPasswordResetToken from "../utils/builders/buildPasswordResetToken";
import sendMail from "../utils/mailer/sendMail/sendMail";
import passwordResetEmail from "../utils/mailer/emails/passwordResetEmail";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import {AuthFailureTypes, AuthResponse, AuthSuccessTypes} from "./AuthResponse";
import {isEmailValid, isPasswordValid} from "./AuthValidator";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import {validateEmail} from "@repo/utils/dist";

const authController = express.Router();

authController
    .route("/sign-up")
    .post(validKeysInRequest('email', 'password', 'name'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, password, name} = req.body;

        const hasUser = await usersService.hasUserWithEmail(req, email);
        if (hasUser) {
            AuthResponse.failed(res, AuthFailureTypes.USER_ALREADY_EXISTS);
        } else {

            const decryptedPassword = atob(password);

            req.session.user = await usersService.createUser(req, decryptedPassword, email, name);

            req.session.save(err => {
                if (err) {
                    AuthResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE);
                } else {
                    AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectURL: '/'});
                }
            });
        }

    });
authController
    .route("/login")
    .post(validKeysInRequest('email', 'password'), isEmailValid, isPasswordValid, async (req, res, next) => {
        const {email, password} = req.body;

        const activeUser = await usersService.findUserByEmail(req, email);

        if (!activeUser) {
            AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND);
        } else {
            const decryptedPassword = atob(password);

            const isPasswordValid = await Bcrypt.compare(activeUser.password, decryptedPassword);

            if (!isPasswordValid) {
                AuthResponse.failed(res, AuthFailureTypes.PASSWORD_IS_INVALID);
            } else {

                const {id, paid_account, name, email: userEmail, date_created, email_notifications} = activeUser;

                req.session.user = {id, paid_account, name, email: userEmail, dateCreated: date_created as Date, email_notifications};

                req.session.save(err => {
                    if (err) {
                        AuthResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE);
                    }
                    AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectURL: '/'});
                });
            }

        }
    });
authController
    .route("/forgot-password")
    .post(validKeysInRequest("email"), isEmailValid, async (req, res) => {
        const {email} = req.body;

        const token = buildPasswordResetToken();

        const foundUser = await usersService.findUserByEmail(req, email);

        if (!foundUser) {
            AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND);
        } else {
            sendMail(passwordResetEmail(email, token), async (err) => {
                if (err) {
                    console.error(`Mailer Issue: \n ${err}`);

                    AuthResponse.failed(res, AuthFailureTypes.TOKEN_FAILED_TO_SEND_TO_EMAIL);
                } else {
                    const hashedToken = await Bcrypt.hash(token);

                    await usersService.setTokenOnUser(req, foundUser.id, hashedToken);
                    AuthResponse.succeeded(res, AuthSuccessTypes.TOKEN_GENERATED_AND_EMAIL_SENT, {redirectURL: `/forgot-password/token`});

                }

            });
        }


    });
authController.route("/verification")
    .post(validKeysInRequest("email", 'token', 'password'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, token, password} = req.body;

        if (token.length !== 7) {
            AuthResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID);
        } else {
            const foundUser = await usersService.findUserByEmail(req, email);
            if (!foundUser) {
                AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND);
            } else if (!foundUser.token_expires || !foundUser.token || await Bcrypt.compare(foundUser.token, token)) {
                AuthResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID);
            } else {
                    const currentTime = new Date();
                    const tokenTime = new Date(foundUser.token_expires);

                    if (tokenTime < currentTime) {
                        AuthResponse.failed(res, AuthFailureTypes.TOKEN_HAS_EXPIRED);
                    } else {
                        const decryptedPassword = atob(password);

                        await usersService.setPasswordOnUser(req, foundUser.id, decryptedPassword);

                        AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectURL: '/'});
                    }
            }
        }
    });
authController.route("/email_notifications/:email")
    .get(async (req, res) => {
        const email = req.params.email;
        const isEmailInvalid = validateEmail(email);
        if(isEmailInvalid){
            AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
        } else {
            const user = await usersService.findUserByEmail(req, email);

            if (user) {
                AuthResponse.succeeded(res, AuthSuccessTypes.SUBSCRIBE_SETTINGS_FOUND, {emailNotifications: user.email_notifications})
             } else {
                AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
            }
        }
    })
authController.route("/email_notifications")
    .post(validKeysInRequest("email", "subscribeSetting"), isEmailValid, async (req, res) => {
        const {email, subscribeSetting} = req.body;
        await usersService.updateSubscribeSettings(req, email);

        AuthResponse.succeeded(res, AuthSuccessTypes.SUBSCRIBE_SETTINGS_UPDATED);
    });
authController
    .route("/logout")
    .get((req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });

authController
    .route("/revalidate")
    .get((req, res) => {
        if (req.session && req.session.user) {
            if (req.session.cookie.maxAge) {
                const minutesRemainingForSession = req.session.cookie.maxAge / 60000;

                if (minutesRemainingForSession <= 5 && minutesRemainingForSession > 1) {
                    const plurality = minutesRemainingForSession === 1 ? '' : 's';
                    AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID,
                        {timeRemaining: `${Math.floor(minutesRemainingForSession)} minute${plurality}`});
                } else if (minutesRemainingForSession < 1) {
                    AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID,
                        {timeRemaining: ' less than a minute'});
                }

            } else {
                AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID);

            }
        } else {
            AuthResponse.failed(res, AuthFailureTypes.SESSION_IS_INVALID);
        }
    });
export default authController;
