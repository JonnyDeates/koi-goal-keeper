import {ReactNode, useEffect, useState} from "react";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {useToastContext} from "../ToastProvider/ToastProvider";

type AuthProviderProps = { children: ReactNode }

const AuthProvider = ({children}: AuthProviderProps) => {

    const {createToast} = useToastContext();

    const checkUserHasValidSession = () => {
        AuthenticationClient.handleRevalidate()
            .then((response) => {
                if(response.data && response.data.timeRemaining	) {
                    createToast({message: `You will be logged out in ${response.data.timeRemaining}, due to inactivity.`})
                }
            })
            .catch(({response}) => {
                if (response.status === 401) {
                    window.location.reload();
                }
            })
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkUserHasValidSession()
        }, 30000);
        return () => clearInterval(interval)
    }, []);

    return <>
        {children}
    </>
}
export default AuthProvider