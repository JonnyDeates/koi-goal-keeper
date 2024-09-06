import {ReactNode, useEffect, useState} from "react";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {useToastContext} from "../ToastProvider/ToastProvider";

type AuthProviderProps = {children: ReactNode}

const AuthProvider = ({children}:AuthProviderProps) => {

  const {createToast} = useToastContext();

  const checkUserHasValidSession = () => {
    AuthenticationClient.handleRevalidate()
      .then(()=> {
        createToast({message: "Fire"})
      })
      .catch(({response})=> {
        if(response.status === 401) {
          window.location.reload();
        }
      })
  };

  useEffect(()=> {
    const interval = setInterval(()=> {
      // checkUserHasValidSession()
      createToast({message: "Fire"})

    }, 3000);
    return () => clearInterval(interval)
  }, []);

  return <>
    {children}
  </>
}
export default AuthProvider