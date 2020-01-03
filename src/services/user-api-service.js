import TokenService from "./token-service";

const UserService = {
    serializeUser(user){
        let userTemp = {id: '', username: '', email: '', notifications: false, nickname: '', autoArchiving: true} || this.getUser();
        return JSON.stringify({
            id: (user.id) ? user.id : userTemp.id,
            username: (user.username) ? user.username : userTemp.username,
            email: (user.email) ? user.email : userTemp.email,
            notifications: (user.notifications) ? user.notifications : userTemp.notifications,
            nickname: (user.nickname) ? user.nickname : userTemp.nickname,
            autoArchiving: (user.autoArchiving) ? user.autoArchiving : userTemp.autoArchiving
        });
    },
    saveUser(user) {
        window.localStorage.setItem('userInfo', this.serializeUser(user))
    },
    getUser() {
        try {
            return JSON.parse(window.localStorage.getItem('userInfo'));
        } catch(error){
            console.log(error);
            UserService.clearUser();
            TokenService.clearAuthToken();
            return null;
        }},
    clearUser() {
        window.localStorage.removeItem('userInfo')
    },
    hasUserInfo() {
        return !!UserService.getUser()
    },
};

export default UserService