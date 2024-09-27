import {type ReactNode, useEffect} from "react";
import AuthenticationClient from "../../clients/AuthenticationClient";
import {useToastContext} from "../ToastProvider/ToastProvider";

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({children}: AuthProviderProps) {

  const {createToast} = useToastContext();

  const checkUserHasValidSession = () => {
    AuthenticationClient.handleRevalidate()
      .then((response: {data?: {timeRemaining: string } }) => {
        if (response.data?.timeRemaining) {
          createToast({message: `You will be logged out in ${response.data.timeRemaining}, due to inactivity.`});
        }
      })
      .catch(({response}: {response: {status: number}}) => {
        if (response.status === 401) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkUserHasValidSession();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>
    {children}
  </>;
}

export default AuthProvider;