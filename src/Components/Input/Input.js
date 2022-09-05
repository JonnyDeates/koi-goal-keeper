import {handleEnter, handleNextFocusEnter} from "../../Utils/Utils";
import React from "react";

export const InputNumber = ({placeholder, value, onChange, isntForm, className, isNum}) => {
    return <input type={isNum ? 'number' : 'text'} className={className ? className : 'cell'} placeholder={placeholder} value={value !== 0 ? value : ''}
                  onChange={onChange} onKeyPress={(e)=>!(!!isntForm) ? handleNextFocusEnter(e) : handleEnter(e, onChange)} />
}
export const InputText = ({placeholder, value, onChange, isntForm}) => {
    return <input type='text' className='cell' placeholder={placeholder} value={value}
                  onChange={onChange} onKeyPress={(e)=>!(!!isntForm) ? handleNextFocusEnter(e) : handleEnter(e, onChange)}/>
}
export const InputCheckBox = ({value, onChange}) => {
    return <input type='checkbox' className='cell' defaultChecked={value}
                  onChange={onChange} onKeyPress={(e)=> handleEnter(e, ()=> onChange(e))}/>
}