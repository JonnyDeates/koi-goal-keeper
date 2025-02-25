import axios, {AxiosResponse} from "axios";
import {UserSettingsResponse} from "@repo/types";

export const USER_URL = '/api/user'
const UserClient = {
    get: (): Promise<AxiosResponse<UserSettingsResponse, any>> => {
        return axios.get(USER_URL)
    },
    remove: () => {
        return axios.delete(`${USER_URL}`)
    },
    updateName: (name: string) => {
        return axios.patch(`${USER_URL}`, {name})
    },
    updatePassword:(oldPassword: string, newPassword: string)=> {
        return axios.patch(`${USER_URL}/password`, {password: newPassword, oldPassword})
    },
}
export default UserClient