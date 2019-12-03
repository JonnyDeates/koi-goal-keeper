const UserService = {
    saveUser(user) {
        window.localStorage.setItem('userInfo', user)
    },
    getUser() {
        return JSON.parse(window.localStorage.getItem('userInfo'));
    },
    clearUser() {
        window.localStorage.removeItem('userInfo')
    },
    hasUserInfo() {
        return !!UserService.getAuthToken()
    },
};

export default UserService