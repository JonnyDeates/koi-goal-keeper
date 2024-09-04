import React from 'react'
import '../shared/src/Utils/Utils.css'
import SettingsService from "../services/local/settings-service.js";

export function getSpecificType(i) {
    return ['Daily', 'Weekly', 'BiWeekly', 'Monthly', 'Quarterly', '6-Month', '9-Month', 'Yearly', '2-Year', '3-Year', '4-Year', '5-Year', '10-Year', '20-Year', '30-Year', 'Distant'][i];
}

export function getTypeColorsAvailable() {
    let newType = [];
    switch (SettingsService.getSettings().type_list) {
        case 'Today List':
            newType = [0, 15];
            break;
        case 'Short List':
            newType = [0, 1, 3, 7, 11, 15];
            break;
        case 'Normal List':
            newType = [0, 1, 3, 4, 5, 7, 9, 11, 15];
            break;
        case 'Extended List':
            newType = [0, 1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 15];
            break;
        case 'Full List':
            newType = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            break;
        default:
            newType = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    }
    return newType;
}
export function getTypeColors() {
    return [{type: 'Default', colors: ['#007a0e', '#4fc300', '#65ff00', '#c7f000'
        , '#f0ca00', '#f05c00', '#cf3900', '#ff2700'
        , '#c51000', '#871000', '#770200', '#4d0000'
        , '#8b005b', '#700077', '#a200f0', '#25002c']},
        {type: 'Cold', colors: ['#0f00ff', '#0076d0', '#00a8ff', '#00def0'
            , '#a500f0', '#fe00ff', '#bf00b9', '#700077'
            , '#854d84', '#6e3973', '#692671', '#3e0a42'
            , '#320729', '#2b002c', '#1b0027', '#000000']},
        {type: 'Earth', colors: ['#ff1700', '#000dd0', '#00a8ff', '#f08100'
            , '#d400f0', '#ffe600', '#00bf0b', '#00770d'
            , '#007a06', '#005406', '#003e08', '#002a04'
            , '#46006a', '#1d002c', '#180027', '#000000']}
]}
export function findTypeColor() {
    let typeColor = getTypeColors().find((theme, i) => SettingsService.getSettings().color_style === theme.type);
    if(typeColor)
        return typeColor;
    else
        return getTypeColors()[0]
}
export function getColor(type) {
    let color = '';
    let ColorThemes = findTypeColor().colors;
    switch (type) {
        case 'Daily':
            color = ColorThemes[0];
            break;
        case 'Weekly':
            color = ColorThemes[1];
            break;
        case 'BiWeekly':
            color = ColorThemes[2];
            break;
        case 'Monthly':
            color = ColorThemes[3];
            break;
        case 'Quarterly':
            color = ColorThemes[4];
            break;
        case '6-Month':
            color = ColorThemes[5];
            break;
        case '9-Month':
            color = ColorThemes[6];
            break;
        case 'Yearly':
            color = ColorThemes[7];
            break;
        case '2-Year':
            color = ColorThemes[8];
            break;
        case '3-Year':
            color = ColorThemes[9];
            break;
        case '4-Year':
            color = ColorThemes[10];
            break;
        case '5-Year':
            color = ColorThemes[11];
            break;
        case '10-Year':
            color = ColorThemes[12];
            break;
        case '20-Year':
            color = ColorThemes[13];
            break;
        case '30-Year':
            color = ColorThemes[14];
            break;
        case 'Distant':
            color = ColorThemes[15];
            break;
        default:
            color = '#888888';
            break;
    }
    return {backgroundColor: color}
}

export function getThemes() {
    return (SettingsService.getSettings().dark_mode) ?  // Checks to see if Dark Mode is Enabled
        [{
        name: 'Default',
            pColor: '#343f47', sColor: '#202938', tColor: '#55585b',
            headerColor: '#000000', fontColor: '#cccccc'
        },
        {
            name: 'Kigoi',
            pColor: '#615c00', sColor: '#453114', tColor: '#6e6a4b',
            headerColor: '#000000', fontColor: '#a5a5a5'
        },
        {
            name: 'Bekko',
            pColor: '#777777', sColor: '#a09ea6', tColor: '#3d3d3d',
            headerColor: '#cccccc', fontColor: '#000000'
        },
        {
            name: 'Benigoi',
            pColor: '#691408', sColor: '#380a00', tColor: '#a43238',
            headerColor: '#000000', fontColor: '#cccccc'
        },
        {
            name: 'Kin Showa',
            pColor: '#692804', sColor: '#363636', tColor: '#706e6d',
            headerColor: '#000000', fontColor: '#cccccc'
        },
        {
            name: 'Sanke',
            pColor: '#691408', sColor: '#363636', tColor: '#905b57',
            headerColor: '#000000', fontColor: '#000000'

        },
        {
            name: 'Platinum',
            pColor: '#081269', sColor: '#000a38', tColor: '#385ca4',
            headerColor: '#575757', fontColor: '#cccccc'
        },            {
            name: 'Lucki',
            pColor: '#086912', sColor: '#00380a', tColor: '#254b25',
            headerColor: '#000000', fontColor: '#cccccc'
        }

        ] : [
        {
            name: 'Default',
            pColor: '#abceea', sColor: '#84adea', tColor: '#e6eef5',
            headerColor: '#ffffff', fontColor: '#000000', inputColor: ''
        },
            {
                name: 'Kigoi',
                pColor: '#e2b521', sColor: '#cd923b', tColor: '#d2ca8e',
                headerColor: '#000000', fontColor: '#ffffff'
            },
            {
                name: 'Bekko',
                pColor: '#ffffff', sColor: '#a09ea6', tColor: '#828282',
                headerColor: '#909090', fontColor: '#000000'
            },
            {
                name: 'Benigoi',
                pColor: '#d10300', sColor: '#751b00', tColor: '#d97375',
                headerColor: '#000000', fontColor: '#cccccc'
            },
            {
                name: 'Kin Showa',
                pColor: '#de4e07', sColor: '#676767', tColor: '#7f7d7c',
                headerColor: '#000000', fontColor: '#ffffff'
            },
            {
                name: 'Sanke',
                pColor: '#c3210d', sColor: '#cccccc', tColor: '#e99d98',
                headerColor: '#000000', fontColor: '#000000'

            },
            {
                name: 'Platinum',
                pColor: '#84adea', sColor: '#49678a', tColor: '#587aaa',
                headerColor: '#5f5f5f', fontColor: '#ffffff'
            },            {
                name: 'Lucki',
                pColor: '#0cc61f', sColor: '#009012', tColor: '#309d2c',
                headerColor: '#000000', fontColor: '#edffef'
            }

    ];
}

export function getCurrentThemeColors() {
    const currentTheme = getThemes().find((theme) => theme.name === SettingsService.getSettings().theme);
    return (!!currentTheme) ? currentTheme : getThemes()[0];

}

export function formatDate(tempDate) {
    const Month = (tempDate.getMonth() + 1 < 10) ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
    const Date = (tempDate.getDate() < 10) ? '0' + tempDate.getDate() : tempDate.getDate();
    return `${tempDate.getFullYear()}-${Month}-${Date}`;
}

export function Button({className, ...props}) {
    return <button className={['Button', className].join(' ')} {...props} />
}

export function Input({className, ...props}) {
    return (
        <input className={['Input', className].join(' ')} {...props} />
    )
}

export function Required({className, ...props}) {
    return (
        <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
    )
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r && 0x3) || 0x8);
        return v.toString(16);
    });
}

export function getTime(type) {
    let tempDate = new Date();
    switch (type) {
        case 'Daily':
            tempDate.setDate(tempDate.getDate() + 1);
            break;
        case 'Weekly':
            tempDate.setDate(tempDate.getDate() + 7);
            break;
        case 'BiWeekly':
            tempDate.setDate(tempDate.getDate() + (7 * 2));
            break;
        case 'Monthly':
            tempDate.setMonth(tempDate.getMonth() + 1);
            break;
        case 'Quarterly':
            tempDate.setMonth(tempDate.getMonth() + 3);
            break;
        case '6-Month':
            tempDate.setMonth(tempDate.getMonth() + 6);
            break;
        case '9-Month':
            tempDate.setMonth(tempDate.getMonth() + 9);
            break;
        case 'Yearly':
            tempDate.setMonth(tempDate.getMonth() + 12);
            break;
        case '2-Year':
            tempDate.setMonth(tempDate.getMonth() + (2 * 12));
            break;
        case '3-Year':
            tempDate.setMonth(tempDate.getMonth() + (3 * 12));
            break;
        case '5-Year':
            tempDate.setMonth(tempDate.getMonth() + (5 * 12));
            break;
        case '10-Year':
            tempDate.setMonth(tempDate.getMonth() + (10 * 12));
            break;
        case '20-Year':
            tempDate.setMonth(tempDate.getMonth() + (20 * 12));
            break;
        case '30-Year':
            tempDate.setMonth(tempDate.getMonth() + (30 * 12));
            break;
        case 'Distant':
            tempDate.setMonth(tempDate.getMonth() + (70 * 12));
            break;
        default:
            tempDate.setDate(tempDate.getDate() + 1);
            break;
    }
    return tempDate;

}

