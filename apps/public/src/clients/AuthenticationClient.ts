import {AxiosInstance} from "@repo/shared";

const AuthenticationClient = {
    postUser(email: string, name: string, password: string) {
        return AxiosInstance.post("/auth/sign-up", { email, name, password: btoa(password) });
    },
    postLogin(email: string, password: string) {
        return AxiosInstance.post("/auth/login", { email, password: btoa(password) });
    },
    postForgotPassword(email: string) {
        return AxiosInstance.post("/auth/forgot-password", {email});
    },
    postVerification(email: string, token: string, password: string) {
        return AxiosInstance.post("/auth/verification", { email, token, password: btoa(password) });
    }
};

export default AuthenticationClient;
