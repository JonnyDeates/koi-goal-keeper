import {AxiosInstance} from "@repo/shared";

const AuthUri = '/auth'

const AuthenticationClient = {
    postUser(email: string, name: string, password: string) {
        return AxiosInstance.post(`${AuthUri}/sign-up`, { email, name, password: btoa(password) });
    },
    postLogin(email: string, password: string) {
        return AxiosInstance.post(`${AuthUri}/login`, { email, password: btoa(password) });
    },
    postForgotPassword(email: string) {
        return AxiosInstance.post(`${AuthUri}/forgot-password`, {email});
    },
    postVerification(email: string, token: string, password: string) {
        return AxiosInstance.post(`${AuthUri}/verification`, { email, token, password: btoa(password) });
    }
};

export default AuthenticationClient;
