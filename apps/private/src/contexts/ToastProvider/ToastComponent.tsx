import {CloseButton} from "koi-pool";
import {CSSProperties, useEffect, useState} from "react";
import './ToastComponent.css'
import {VariantsType} from "koi-pool/dist/types/VariantsType";
import cuid2 from "@paralleldrive/cuid2";

export type ToastStateType = {
  displayTime: number,
  variant: Omit<VariantsType, 'disabled'>,
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

  return <div className={"ToastComponent"}>
    <p>{message}</p>
    <CloseButton onClick={()=> handleClose(id)}/>
    <div style={{width: `${percentageRemaining}%`, height: '2px', backgroundColor: "rgba(0,0,0,0.2)"}}/>
  </div>
};

export default ToastComponent;