import {AxiosInstance} from "@repo/shared";

const AuthUri = '/auth'

const AuthenticationClient = {
    handleLogout: () => {
        window.location.href = `${AuthUri}/logout`
    },
    handleRevalidate: () => {
        return AxiosInstance.get(`${AuthUri}/revalidate`)
    }
};

export default AuthenticationClient;
