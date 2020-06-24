const UserService = {
    serializeUser(user){
        if(this.getUser()) {
            let userTemp = this.getUser();
            return JSON.stringify({
                id: (!!user.id) ? user.id : userTemp.id,
                username: (!!user.username) ? user.username : userTemp.username,
                nickname: (!!user.nickname) ? user.nickname : userTemp.nickname,
            });
        } else {
            return JSON.stringify({...user})
        }
    },
    saveUser(user) {
        window.localStorage.setItem('userInfo', this.serializeUser(user))
    },
    getUser() {
        try {
            return JSON.parse(window.localStorage.getItem('userInfo'));
        } catch(error){
            console.log(error);
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
