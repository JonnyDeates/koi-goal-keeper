import * as React from "react";
export const SettingsContext = React.createContext({
    themes: ['Blue / White', 'Blue / Black', 'Red / White', 'Red / Black'],
    username: '',
    email: '',
    nickname: '',
    id: '',
    currentTheme: 'Blue / White',
    autoArchiving: true,
    toggleArchiving: () => {},
    setTheme: () => {},
    updateNickname: () => {},
    updateEmail: () => {}
});