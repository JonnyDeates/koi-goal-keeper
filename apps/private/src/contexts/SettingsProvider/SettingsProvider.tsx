import React, {createContext, type ReactNode} from "react";


interface SettingsContextType {
  user: string
}

const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

function SettingsProvider({children}: { children: ReactNode }) {
  // const [settings, applyActionToGoalList] = useState<any>({});

  return <SettingsContext.Provider value={{user: "yes"}}>
    {children}
  </SettingsContext.Provider>;
}

export default SettingsProvider;

// export const useSettingsContext = () => useContext(SettingsContext);