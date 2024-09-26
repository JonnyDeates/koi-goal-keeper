import React, {createContext, ReactNode, useContext, useState} from "react";


type SettingsContextType = {}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

const SettingsProvider = ({children}: { children: ReactNode }) => {
  const [settings, applyActionToGoalList] = useState<any>({});

  return <SettingsContext.Provider value={{}}>
    {children}
  </SettingsContext.Provider>;
};

export default SettingsProvider;

export const useSettingsContext = () => useContext(SettingsContext);