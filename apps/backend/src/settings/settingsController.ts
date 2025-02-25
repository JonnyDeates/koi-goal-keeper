import express from "express";
import {requireUserLoggedIn} from "../authentication/AuthValidator";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import settingsService from "../settings/settingsService";
import {SettingFailureTypes, SettingsResponse, SettingSuccessTypes} from "./SettingsResponse";

const settingsController = express.Router();


settingsController
    .route('/')
    .all(requireUserLoggedIn)
    .patch(validKeysInRequest('selectableDueDateOption'), async (req, res, next) => {
        const {selectableDueDateOption} = req.body;
        const {id} = req.session.user!;

        const isValidSelectableDueDate = [''].includes('selectableDueDateOption')
        if (isValidSelectableDueDate) {
            SettingsResponse.failed(res, SettingFailureTypes.PARAMETER_INVALID)
        } else {
            await settingsService.update(req, id, {selectedDueDate: selectableDueDateOption});

            SettingsResponse.succeeded(res, SettingSuccessTypes.SETTING_UPDATED);
        }
    });
export default settingsController;
