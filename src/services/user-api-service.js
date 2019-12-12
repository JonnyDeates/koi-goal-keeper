import {catchClause} from "@babel/types";
import AuthApiService from "./auth-api-service";
import TokenService from "./token-service";

const UserService = {
    saveUser(user) {
        console.log(user);
        window.localStorage.setItem('userInfo', user)
    },
    getUser() {
        try
        {
            return JSON.parse(window.localStorage.getItem('userInfo')) || null;
        } catch(error){
            console.log(error);
            UserService.clearUser();
            TokenService.clearAuthToken();
        }
        },
    clearUser() {
        window.localStorage.removeItem('userInfo')
    },
    hasUserInfo() {
        return !!UserService.getUser()
    },
};

export default UserService