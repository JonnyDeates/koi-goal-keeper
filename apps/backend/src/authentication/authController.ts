import express from "express";
import usersService from "../users/usersService";
import {isEmailValid, isPasswordValid} from "./AuthValidator";
import buildPasswordResetToken from "../utils/builders/buildPasswordResetToken";
import sendMail from "../utils/mailer/sendMail/sendMail";
import passwordResetEmail from "../utils/mailer/emails/passwordResetEmail";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import {AuthErrorMappings, AuthFailureTypes, AuthSuccessMappings, AuthSuccessTypes} from "./AuthResponse";
import {GenericResponse} from "../utils/GenericResponse/GenericResponse";
import Bcrypt from "../utils/bcrypt/Bcrypt";

const authController = express.Router();

const authResponse = new GenericResponse(AuthErrorMappings, AuthSuccessMappings);

authController
    .route("/sign-up")
    .post(validKeysInRequest('email', 'password', 'name'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, password, name} = req.body;

        const hasUser = await usersService.hasUserWithEmail(req, email);
        if (hasUser) {
            return authResponse.failed(res, AuthFailureTypes.USER_ALREADY_EXISTS);
        }

        const decryptedPassword = atob(password);

        req.session.user = await usersService.createUser(req, decryptedPassword, email, name);

        req.session.save(err => {
            if (err) {
                return authResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE);
            }
            return authResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN);
        })
    });
authController
    .route("/login")
    .post(validKeysInRequest('email', 'password'), isEmailValid, isPasswordValid, async (req, res, next) => {
        const {email, password} = req.body;

        const activeUser = await usersService.findUserByEmail(req, email);

        if (!activeUser) {
            return authResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND);
        }


        const decryptedPassword = atob(password);

        const isPasswordValid = await Bcrypt.compare(activeUser.password, decryptedPassword);

        if(!isPasswordValid){
            return authResponse.failed(res, AuthFailureTypes.PASSWORD_IS_INVALID);
        }

        const {id, paid_account, name, email: userEmail} = activeUser;

        req.session.user = {id, paid_account, name, email: userEmail}

        req.session.save(err => {
            if (err) {
                return authResponse.failed(res, AuthFailureTypes.SESSION_FAILED_TO_SAVE)
            }
            return authResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN)
        })
    })
authController
    .route("/forgot-password")
    .post(validKeysInRequest("email"), isEmailValid, async (req, res) => {
        const {email} = req.body;

        const token = buildPasswordResetToken();

        const foundUser = await usersService.findUserByEmail(req, email);

        if (!foundUser) {
            return authResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
        }

        sendMail(passwordResetEmail(email, token), async (err) => {
            if (err) {
                console.error(`Mailer Issue: \n ${err}`);

                return authResponse.failed(res, AuthFailureTypes.TOKEN_FAILED_TO_SEND_TO_EMAIL)
            } else {
                const hashedToken =  await Bcrypt.hash(token)

                await usersService.setTokenOnUser(req, foundUser.id, hashedToken);
                return authResponse.succeeded(res, AuthSuccessTypes.TOKEN_GENERATED_AND_EMAIL_SENT, `/forgot-password/token?email=${email}`)
            }
        });

    })
authController.route("/verification")
    .post(validKeysInRequest("email", 'token', 'password'), isEmailValid, isPasswordValid, async (req, res) => {
        const {email, token, password} = req.body;

        if (token.length !== 7) {
            return authResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID)
        }

        const foundUser = await usersService.findUserByEmail(req, email);
        if (!foundUser) {
            return authResponse.failed(res, AuthFailureTypes.USER_NOT_FOUND)
        }

        if (!foundUser.token_expires || !foundUser.token || await Bcrypt.compare(foundUser.token, token) ) {
            return authResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID)
        }

        const isTokenValid = await Bcrypt.compare(foundUser.token, token);
        if(!isTokenValid){
            return authResponse.failed(res, AuthFailureTypes.TOKEN_IS_INVALID);
        }

        const currentTime = new Date();
        const tokenTime =  new Date(foundUser.token_expires);

        if (tokenTime < currentTime) {
            return authResponse.failed(res, AuthFailureTypes.TOKEN_HAS_EXPIRED)
        }

        const decryptedPassword = atob(password);

        await usersService.setPasswordOnUser(req, foundUser.id, decryptedPassword)

        return authResponse.succeeded(res, AuthSuccessTypes.USER_LOGS_IN)
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
    if(req.session && req.session.user) {
      return authResponse.succeeded(res, AuthSuccessTypes.SESSION_IS_VALID)
    }

    return authResponse.failed(res, AuthFailureTypes.SESSION_IS_INVALID)
  });
export default authController;
