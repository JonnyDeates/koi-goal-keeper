import express from "express";
import {SessionData} from "@repo/types";
import {isPasswordValid, requireUserLoggedIn} from "../authentication/AuthValidator";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import usersService from "./usersService";
import {UserFailureTypes, UserResponse, UserSuccessTypes} from "./UserResponse";

const usersController = express.Router();


usersController
    .route('/')
    .all(requireUserLoggedIn)
    .get((req, res) => {
            const user = req.session.user!;

            UserResponse.succeeded(res, UserSuccessTypes.USER_DETAILS, user);
        }
    )
    .delete(async (req, res) => {
            const {id} = req.session.user!;

            await usersService.remove(req, id);

            UserResponse.succeeded(res, UserSuccessTypes.USER_REMOVED);
        }
    )
    .patch(validKeysInRequest('name'), async (req, res, next) => {
        const {name} = req.body;
        const {id} = req.session.user!;

        await usersService.setNameOnUser(req, id, name);

        UserResponse.succeeded(res, UserSuccessTypes.USER_UPDATED);

    });
usersController
    .route('/password')
    .patch(requireUserLoggedIn, validKeysInRequest('password', 'oldPassword'), isPasswordValid, async (req, res) => {
        const {oldPassword, password} = req.body;
        const {id} = req.session.user!;

        const foundUser = await usersService.findUserById(req, id);
        if (!foundUser)
            UserResponse.failed(res, UserFailureTypes.USER_NOT_FOUND);
        else {
            const passwordComparison = await Bcrypt.compare(foundUser.password, oldPassword);
            if (!passwordComparison) {
                UserResponse.failed(res, UserFailureTypes.USER_PASSWORD_IS_INVALID);
            } else {
                await usersService.setPasswordOnUser(req, id, password);

                UserResponse.succeeded(res, UserSuccessTypes.USER_UPDATED);
            }
        }
    });
export default usersController;
