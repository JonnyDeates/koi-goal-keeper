import axios, {AxiosResponse} from "axios";
import {SELECTABLE_DUE_DATE_OPTION} from "@repo/types";

export const SETTINGS_URL = '/api/settings'
const SettingsClient = {
    updateSelectedDueDateOption: (selectableDueDateOption: SELECTABLE_DUE_DATE_OPTION) => {
        return axios.patch(`${SETTINGS_URL}`, {selectableDueDateOption})
    },
}
export default SettingsClient