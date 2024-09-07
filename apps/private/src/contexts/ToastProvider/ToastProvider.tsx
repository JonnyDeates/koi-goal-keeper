import {createContext, ReactNode, useContext, useState} from "react";
import {ToastStateType} from "./ToastComponent";
import cuid2 from "@paralleldrive/cuid2";
import ToastList, {ToastPosition} from "./ToastList";


type handleOpenToastType = (newToast: (Omit<Partial<ToastStateType>, "message"> & Pick<ToastStateType, "message">)) => void

type ToastContextType = {
  deleteToast: (id: string) => void,
  createToast: handleOpenToastType
  toastList: ToastStateType[]
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);


const buildToast = (partialToast: Partial<ToastStateType> = {}): ToastStateType => ({
  displayTime: 5000,
  message: '',
  variant: "standard",
  ...partialToast,
  id: cuid2.createId()
});

type ToastProviderProps = { children: ReactNode, position?: ToastPosition }

const ToastProvider = ({children, position = 'top-center'}: ToastProviderProps) => {
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