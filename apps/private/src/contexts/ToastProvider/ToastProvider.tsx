import {createContext, ReactNode, useContext, useState} from "react";
import {ToastStateType} from "./ToastComponent";
import cuid2 from "@paralleldrive/cuid2";
import ToastList from "./ToastList";


type handleOpenToastType = (newToast: (Omit<Partial<ToastStateType>, "message"> & Pick<ToastStateType, "message">)) => void

type ToastContextType = {
  deleteToast: (id: string) => void,
  createToast: handleOpenToastType
  toastList: ToastStateType[]
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

type ToastProviderProps = { children: ReactNode }

const buildToast = (partialToast: Partial<ToastStateType> = {}): ToastStateType => ({
  displayTime: 5000,
  message: '',
  variant: "default",
  ...partialToast,
  id: cuid2.createId()
});


const ToastProvider = ({children, position = 'center'}: ToastProviderProps) => {
  const [toastList, setToastList] = useState<ToastStateType[]>([]);

  const handleClose = (id: string) => {

    setToastList((toastList) => toastList.filter(toastToRemove => toastToRemove.id !== id))
  };

  const handleOpen: handleOpenToastType = (newState) => {
    setToastList((prevState) => [...prevState, buildToast(newState)]);
  };


  const contextValue: ToastContextType = {
    toastList,
    deleteToast: handleClose,
    createToast: handleOpen
  };

  return <ToastContext.Provider value={contextValue}>
    {children}
    <ToastList handleClose={handleClose}
               position={position} toastList={toastList}/>
  </ToastContext.Provider>
};


export const useToastContext = () => useContext(ToastContext);
export default ToastProvider