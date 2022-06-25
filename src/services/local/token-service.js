import AuthApiService from "../database/auth-api-service";
const location = 'token'

const TokenService = {
    saveAuthToken(token) {
        const expires = new Date()
        expires.setTime(expires.getTime()+(7*24*60*60*1000))
        document.cookie = `${location}=${token};expires=${expires.toUTCString()}};path=/; Secure`
    },
    getAuthToken() {
        let name = `${location}=`;
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';')
        for(let c of ca) {
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    },
    clearAuthToken() {
        const cookie = getCookie(location);

        if(cookie) {
            document.cookie = `${location}=${cookie[1]};path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure`
        }
    },
    hasAuthToken() { // Valid if there && is not expired
        return !!this.getAuthToken()
    },
    async hasValidAuthToken() { // Valid if there && is not expired
        const authToken = !!this.getAuthToken()
        if(authToken) {
            let response = false
            await AuthApiService.tokenCheck().then((res)=> response = res)
            return response
        }
        return authToken
    },
};
function getCookie(name){
    return document.cookie.split(';').filter(c => {
        return c.trim().startsWith(name + '=');
    });
}

export default TokenService
