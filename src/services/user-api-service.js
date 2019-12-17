import TokenService from "./token-service";

const UserService = {
    saveUser(user) {
        window.localStorage.setItem('userInfo', user)
    },
    getUser() {
        try {
            return JSON.parse(window.localStorage.getItem('userInfo'));
        } catch(error){
            console.log(error);
            UserService.clearUser();
            TokenService.clearAuthToken();
        }},
    clearUser() {
        window.localStorage.removeItem('userInfo')
    },
    hasUserInfo() {
        return !!UserService.getUser()
    },
};

export default UserService