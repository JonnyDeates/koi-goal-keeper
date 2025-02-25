import React, {createContext, type ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {UserSettingsResponse} from "@repo/types";
import UserClient from "../../Pages/Settings/clients/UserClient";
import {buildUserSettings} from "@repo/utils";


interface SettingsContextType {
  user: UserSettingsResponse,
  applyActionToUser: React.Dispatch<SetStateAction<UserSettingsResponse>>
}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

function SettingsProvider({children}: { children: ReactNode }) {
  const [user, applyActionToUser] = useState<UserSettingsResponse>(buildUserSettings());

  useEffect(()=>{
    UserClient.get().then(res => {
      applyActionToUser(res.data)
    })
  },[])

  return <SettingsContext.Provider value={{user, applyActionToUser}}>
    {children}
  </SettingsContext.Provider>;
}

export default SettingsProvider;

export const useSettings = () => useContext(SettingsContext);