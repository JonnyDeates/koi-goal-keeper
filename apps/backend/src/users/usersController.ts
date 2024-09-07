import express from "express";
import usersService from "./usersService";
import {isPasswordValid, requireUserLoggedIn} from "../authentication/AuthValidator";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import {SessionData} from "@repo/types";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import {UserFailureTypes, UserResponse, UserSuccessTypes} from "./UserResponse";

const usersController = express.Router();


usersController
    .route('/')
    .all(requireUserLoggedIn)
    .get((req, res) => {
            const user = req.session.user as SessionData;

            return UserResponse.succeeded(res, UserSuccessTypes.USER_DETAILS, user)
        }
    )
    .delete(async (req, res) => {
            const {id} = req.session.user as SessionData;

            await usersService.remove(req, id);

            return UserResponse.succeeded(res, UserSuccessTypes.USER_REMOVED)
        }
    )
    .patch(validKeysInRequest('name'), async (req, res, next) => {
        const {name} = req.body;
        const {id} = req.session.user as SessionData;

        await usersService.setNameOnUser(req, id, name)

        return UserResponse.succeeded(res, UserSuccessTypes.USER_UPDATED)

    })
usersController
    .route('/password')
    .patch(requireUserLoggedIn, validKeysInRequest('password', 'oldPassword'), isPasswordValid, async (req, res) => {
        const {oldPassword, password} = req.body;
        const {id} = req.session.user as SessionData;

        const foundUser = await usersService.findUserById(req, id);
        if (!foundUser)
            return UserResponse.failed(res, UserFailureTypes.USER_NOT_FOUND)


        const passwordComparison = await Bcrypt.compare(foundUser.password, oldPassword);
        if (!passwordComparison) {
            return UserResponse.failed(res, UserFailureTypes.USER_PASSWORD_IS_INVALID)
        }

        await usersService.setPasswordOnUser(req, id, password);

        return UserResponse.succeeded(res, UserSuccessTypes.USER_UPDATED);
    });
export default usersController;
