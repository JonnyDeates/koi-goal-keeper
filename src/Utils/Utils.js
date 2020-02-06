import React from 'react'
import './Utils.css'

export function getColor(type) {
    let color = '';
    let index = 0;
    let ColorThemes = [
        ['#007a0e','#4fc300','#65ff00','#c7f000'
            ,'#f0ca00','#f05c00','#cf3900','#ff2700'
            ,'#c51000','#871000','#770200','#4d0000'
            ,'#8b005b','#700077','#a200f0','#25002c'],
        ['#0f00ff','#0076d0','#00a8ff','#00def0'
            ,'#a500f0','#fe00ff','#bf00b9','#700077'
            ,'#854d84','#6e3973','#692671','#3e0a42'
            ,'#320729','#2b002c','#1b0027','#000000'],
        ['#ff1700','#000dd0','#00a8ff','#f08100'
            ,'#d400f0','#ffe600','#00bf0b','#00770d'
            ,'#007a06','#005406','#003e08','#002a04'
            ,'#46006a','#1d002c','#180027','#000000'],]
    switch (type) {
        case 'Daily':
            color = ColorThemes[index][0];
            break;
        case 'Weekly':
            color = ColorThemes[index][1];
            break;
        case 'BiWeekly':
            color = ColorThemes[index][2];
            break;
        case 'Monthly':
            color = ColorThemes[index][3];
            break;
        case 'Quarterly':
            color = ColorThemes[index][4];
            break;
        case '6-Month':
            color = ColorThemes[index][5];
            break;
        case 'Yearly':
            color = ColorThemes[index][6];
            break;
        case '2-Year':
            color = ColorThemes[index][7];
            break;
        case '3-Year':
            color = ColorThemes[index][8];
            break;
        case '4-Year':
            color = ColorThemes[index][9];
            break;
        case '5-Year':
            color = ColorThemes[index][10];
            break;
        case '10-Year':
            color = ColorThemes[index][11];
            break;
        case '15-Year':
            color = ColorThemes[index][12];
            break;
        case '20-Year':
            color = ColorThemes[index][13];
            break;
        case '25-Year':
            color = ColorThemes[index][14];
            break;
        case 'Distant':
            color = ColorThemes[index][15];
            break;
        default:
            color = '#888888';
            break;
    }
    return {backgroundColor: color}
}
export function formatDate(tempDate) {
    const Month = (tempDate.getUTCMonth()+1 < 10) ? '0'+(tempDate.getUTCMonth()+1) : (tempDate.getUTCMonth()+1);
    const Date = (tempDate.getUTCDate() < 10) ? '0'+tempDate.getUTCDate() : tempDate.getUTCDate();
    return `${tempDate.getUTCFullYear()}-${Month}-${Date}`;
}

export function Button({ className, ...props }) {
    return <button className={['Button', className].join(' ')} {...props} />
}

export function Input({ className, ...props }) {
    return (
        <input className={['Input', className].join(' ')} {...props} />
    )
}

export function Required({ className, ...props }) {
    return (
        <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
    )
}