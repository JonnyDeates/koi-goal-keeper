import {CloseButton} from "koi-pool";
import {useEffect, useState} from "react";
import './ToastComponent.css'

type ToastVariantsType = 'standard' | 'success' | "warning" | 'error';

export type ToastStateType = {
  displayTime: number,
  variant: ToastVariantsType,
  message: string,
  id: string
}

type ToastComponentProps = ToastStateType & { handleClose: (id: string) => void };

const ToastComponent = ({ displayTime, variant, id, message, handleClose}: ToastComponentProps) => {
  const [currentTimeRemaining, setCurrentTimeRemaining] = useState(displayTime);

  useEffect(()=> {
      const interval = setInterval(()=> {
        setCurrentTimeRemaining((prevState) => prevState - 50)
      }, 50);

      setTimeout(()=> {
        handleClose(id)
      }, displayTime);

      return () => {
        clearInterval(interval);
      }
   }, []);


  const percentageRemaining = (currentTimeRemaining / displayTime) * 100;



  return <div className={`ToastComponent ${variant}`}>
    <p>{message}</p>
    <CloseButton onClick={()=> handleClose(id)} className={'CloseButton'}/>
    <div className={'TimeRemainingBar'} style={{width: `${percentageRemaining}%`}}/>
  </div>
};

export default ToastComponent;