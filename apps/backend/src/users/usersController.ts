import express from "express";
import {isPasswordValid, requireUserLoggedIn} from "../authentication/AuthValidator";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import usersService from "./usersService";
import {UserFailureTypes, UserResponse, UserSuccessTypes} from "./UserResponse";
import {validateName} from "@repo/utils";
import settingsService from "../settings/settingsService";

const usersController = express.Router();


usersController
    .route('/')
    .all(requireUserLoggedIn)
    .get(async (req, res) => {
            const user = req.session.user!;

            const settings = await settingsService.findOrCreate(req, user.id)

            UserResponse.succeeded(res, UserSuccessTypes.USER_DETAILS, {...user, ...settings, id: undefined});
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

        const isNameValid = validateName(name);
        if (isNameValid) {
            UserResponse.failed(res, UserFailureTypes.USER_NAME_IS_INVALID)
        } else {
            await usersService.setNameOnUser(req, id, name);

            req.session.user!.name = name
            UserResponse.succeeded(res, UserSuccessTypes.USER_UPDATED);
        }


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
