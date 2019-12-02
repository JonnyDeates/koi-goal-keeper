import * as React from "react";
export const ToastContext = React.createContext({
    textList: [],
    addText: (text) => {this.textList.push(text)},
    deleteText: (i) => {this.textList.},
    setShortBreak: () => {},
    setLongBreak: () => {},
});