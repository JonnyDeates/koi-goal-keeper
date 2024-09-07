import express from "express";
import usersService from "../users/usersService";
import {isEmailValid, isPasswordValid} from "./AuthValidator";
import buildPasswordResetToken from "../utils/builders/buildPasswordResetToken";
import sendMail from "../utils/mailer/sendMail/sendMail";
import passwordResetEmail from "../utils/mailer/emails/passwordResetEmail";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import {AuthFailureTypes, AuthResponse, AuthSuccessTypes} from "./AuthResponse";
import Bcrypt from "../utils/bcrypt/Bcrypt";

const authController = express.Router();

authController
    .route("/sign-up")
    .post(validKeysInRequest('email', 'password', 'name'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, password, name} = req.body;

        const hasUser = await usersService.hasUserWithEmail(req, email);
        if (hasUser) {
            return AuthResponse.failed(res, AuthFailureTypes.USER_ALREADY_EXISTS);
        }

        const decryptedPassword = atob(password);

        req.session.user = await usersService.createUser(req, decryptedPassword, email, name);

        req.session.save(err => {
            if (err) {
                return AuthResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE);
            }
            return AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectUrl: '/'});
        })
    });
authController
    .route("/login")
    .post(validKeysInRequest('email', 'password'), isEmailValid, isPasswordValid, async (req, res, next) => {
        const {email, password} = req.body;

        const activeUser = await usersService.findUserByEmail(req, email);

        if (!activeUser) {
            return AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND);
        }


        const decryptedPassword = atob(password);

        const isPasswordValid = await Bcrypt.compare(activeUser.password, decryptedPassword);

        if (!isPasswordValid) {
            return AuthResponse.failed(res, AuthFailureTypes.PASSWORD_IS_INVALID);
        }

        const {id, paid_account, name, email: userEmail} = activeUser;

        req.session.user = {id, paid_account, name, email: userEmail}

        req.session.save(err => {
            if (err) {
                return AuthResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE)
            }
            return AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectUrl: '/'})
        })
    })
authController
    .route("/forgot-password")
    .post(validKeysInRequest("email"), isEmailValid, async (req, res) => {
        const {email} = req.body;

        const token = buildPasswordResetToken();

        const foundUser = await usersService.findUserByEmail(req, email);

        if (!foundUser) {
            return AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
        }

        sendMail(passwordResetEmail(email, token), async (err) => {
            if (err) {
                console.error(`Mailer Issue: \n ${err}`);

                return AuthResponse.failed(res, AuthFailureTypes.TOKEN_FAILED_TO_SEND_TO_EMAIL)
            } else {
                const hashedToken = await Bcrypt.hash(token)

                await usersService.setTokenOnUser(req, foundUser.id, hashedToken);
                return AuthResponse.succeeded(res, AuthSuccessTypes.TOKEN_GENERATED_AND_EMAIL_SENT, {redirectUrl: `/forgot-password/token?email=${email}`})
            }
        });

    })
authController.route("/verification")
    .post(validKeysInRequest("email", 'token', 'password'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, token, password} = req.body;

        if (token.length !== 7) {
            return AuthResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID)
        }

        const foundUser = await usersService.findUserByEmail(req, email);
        if (!foundUser) {
            return AuthResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
        }

        if (!foundUser.token_expires || !foundUser.token || await Bcrypt.compare(foundUser.token, token)) {
            return AuthResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID)
        }

        const isTokenValid = await Bcrypt.compare(foundUser.token, token);
        if (!isTokenValid) {
            return AuthResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID);
        }

        const currentTime = new Date();
        const tokenTime = new Date(foundUser.token_expires);

        if (tokenTime < currentTime) {
            return AuthResponse.failed(res, AuthFailureTypes.TOKEN_HAS_EXPIRED)
        }

        const decryptedPassword = atob(password);

        await usersService.setPasswordOnUser(req, foundUser.id, decryptedPassword)

        return AuthResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN, {redirectUrl: '/'})
    });
authController
    .route("/logout")
    .get((req, res) => {
        return req.session.destroy(() => {
            return res.redirect("/");
        })
    });

authController
    .route("/revalidate")
    .get((req, res) => {
        if (req.session && req.session.user) {
            if (req.session.cookie.maxAge) {
                const minutesRemainingForSession =req.session.cookie.maxAge / 60000

                if( minutesRemainingForSession <= 5 && minutesRemainingForSession > 1) {
                    const plurality = minutesRemainingForSession === 1 ? '' : 's'
                    return AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID,
                        {timeRemaining: `${Math.floor(minutesRemainingForSession)} minute${plurality}`})
                } else if(minutesRemainingForSession < 1) {
                    return AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID,
                        {timeRemaining: ' less than a minute'})

                }

            }
            return AuthResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID)
        }

        return AuthResponse.failed(res, AuthFailureTypes.SESSION_IS_INVALID)
    });
export default authController;
