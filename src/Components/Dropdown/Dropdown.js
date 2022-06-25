import React from 'react';
import './Dropdown.css';
import {getAccentColor} from "../../Utils/Theming"
export const Dropdown = ({currentSet, items, setCurrent, color, isColor, darkmode}) => {
    return <div className={'dropdown'} >
        <p style={{backgroundColor: color}}>{currentSet}</p>
        <div className='dropdown-content'>
            <ul >
                {items.map((str,i) => <li key={'dropdown'+str+i} style={{backgroundColor: isColor ? getAccentColor({theme: str, darkmode}) : color}} onClick={()=> setCurrent(str)}>{str}</li>)}
            </ul>
        </div>
    </div>
}