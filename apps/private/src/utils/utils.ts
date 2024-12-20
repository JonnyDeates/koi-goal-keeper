import dayjs, {ManipulateType} from "dayjs";
import {CSSProperties} from "react";


export enum DUE_DATE {
    LATE = "PAST DUE",
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    WEEK = "Next Week",
    TWO_WEEKS = "2 Weeks from now",
    MONTH = "Next Month",
    TWO_MONTHS = "2 Months from now",
    QUARTER = "Next Quarter",
    SIX_MONTHS = "6 Months from now",
    YEAR = 'Next Year',
    TWO_YEARS = '2 Years from now',
    THREE_YEARS = '3 Years from now',
}

export const allDueDates = (): DUE_DATE[] => [
    DUE_DATE.TODAY,
    DUE_DATE.TOMORROW,
    DUE_DATE.WEEK,
    DUE_DATE.TWO_WEEKS,
    DUE_DATE.MONTH,
    DUE_DATE.TWO_MONTHS,
    DUE_DATE.QUARTER,
    DUE_DATE.SIX_MONTHS,
    DUE_DATE.YEAR,
    DUE_DATE.TWO_YEARS,
    DUE_DATE.THREE_YEARS
];

export const allDueDatesAndDates = (): Record<DUE_DATE, Date> => {
    return allDueDates().reduce<Record<DUE_DATE, Date>>((yeet, dueDate) => {
        yeet[dueDate] = getDateFromDueDate(dueDate);
        return yeet;
    }, {} as Record<DUE_DATE, Date>);
};

export const getDateFromDueDate = (currentDueDate: DUE_DATE): Date => {
    switch (currentDueDate) {
        case DUE_DATE.TODAY:
            return dayjs().toDate();
        case DUE_DATE.TOMORROW:
            return dayjs().add(1, 'day').toDate();
        case DUE_DATE.WEEK:
            return dayjs().add(1, 'week').toDate();
        case DUE_DATE.TWO_WEEKS:
            return dayjs().add(2, 'week').toDate();
        case DUE_DATE.MONTH:
            return dayjs().add(1, 'month').toDate();
        case DUE_DATE.TWO_MONTHS:
            return dayjs().add(2, 'month').toDate();
        case DUE_DATE.QUARTER:
            return dayjs().add(3, 'month').toDate();
        case DUE_DATE.SIX_MONTHS:
            return dayjs().add(6, 'month').toDate();
        case DUE_DATE.YEAR:
            return dayjs().add(1, "year").toDate();
        case DUE_DATE.TWO_YEARS:
            return dayjs().add(2, 'year').toDate();
        case DUE_DATE.THREE_YEARS:
            return dayjs().add(3, 'year').toDate();
        default:
            return dayjs().subtract(1, 'day').toDate();
    }

};

export const getDueDateFromDate = (date: Date): DUE_DATE => {
    const currentDate = dayjs(date);
    const TodayDate = dayjs(new Date());

    if(currentDate.isBefore(TodayDate, 'day')) return DUE_DATE.LATE;

    if (currentDate.isSame(TodayDate, 'day')) return DUE_DATE.TODAY;

    const thresholds: { value: number, unit: ManipulateType, result: DUE_DATE }[] = [
        {value: 1, unit: 'days', result: DUE_DATE.TOMORROW},
        {value: 7, unit: 'days', result: DUE_DATE.WEEK},
        {value: 14, unit: 'days', result: DUE_DATE.TWO_WEEKS},
        {value: 1, unit: 'month', result: DUE_DATE.MONTH},
        {value: 2, unit: 'months', result: DUE_DATE.TWO_MONTHS},
        {value: 3, unit: 'months', result: DUE_DATE.QUARTER},
        {value: 6, unit: 'months', result: DUE_DATE.SIX_MONTHS},
        {value: 1, unit: 'years', result: DUE_DATE.YEAR},
        {value: 2, unit: 'years', result: DUE_DATE.TWO_YEARS},
        {value: 3, unit: 'years', result: DUE_DATE.THREE_YEARS}
    ];

    for (const threshold of thresholds) {
        const addTime = dayjs(TodayDate).add(threshold.value, threshold.unit);
        if (currentDate.isBefore(addTime) || currentDate.isSame(addTime)) return threshold.result;
    }
    return DUE_DATE.THREE_YEARS;


};
type ColorSelectionOptions = 'Default'

type ColorType = Record<ColorSelectionOptions, Record<DUE_DATE, Pick<CSSProperties, 'color' | 'backgroundColor'>>>

export const ColorSelection: ColorType = (
    {
        Default: {
            [DUE_DATE.TODAY]: {backgroundColor: '#007a0e'},
            [DUE_DATE.TOMORROW]:  {backgroundColor: "#4fc300"},
            [DUE_DATE.WEEK]:  {backgroundColor: "#65ff00"},
            [DUE_DATE.TWO_WEEKS]:  {backgroundColor: "#c7f000"},
            [DUE_DATE.MONTH]:  {backgroundColor: "#f0ca00"},
            [DUE_DATE.TWO_MONTHS]:  {backgroundColor: "#f07800"},
            [DUE_DATE.QUARTER]:  {backgroundColor: "#c93900"},
            [DUE_DATE.SIX_MONTHS]:  {backgroundColor: "#a41300"},
            [DUE_DATE.YEAR]:  {backgroundColor: "#6c0000", color: "white"},
            [DUE_DATE.TWO_YEARS]:  {backgroundColor: "#540000", color: 'white'},
            [DUE_DATE.THREE_YEARS]:  {backgroundColor: "#110000", color: 'white'},
            [DUE_DATE.LATE]:  {backgroundColor: "black", color: 'white'}
        }
    }
);


export const findNextElementInListToFocusOn = (tasksListOfIds: string[], index = -1) => {
    for (let x = index+1; x < tasksListOfIds.length; x++) {
        const elementsId = tasksListOfIds[x]
        if (elementsId) {
            const nextElementInList = document.getElementById(elementsId);
            if (nextElementInList) {
                nextElementInList.focus();
                break;
            }
        }
    }
}


// return [{
//     type: 'Default', colors: ['#007a0e', '#4fc300', '#65ff00', '#c7f000'
//         , '#f0ca00', '#f05c00', '#cf3900', '#ff2700'
//         , '#c51000', '#871000', '#770200', '#4d0000'
//         , '#8b005b', '#700077', '#a200f0', '#25002c']
// },
//     {
//         type: 'Cold', colors: ['#0f00ff', '#0076d0', '#00a8ff', '#00def0'
//             , '#a500f0', '#fe00ff', '#bf00b9', '#700077'
//             , '#854d84', '#6e3973', '#692671', '#3e0a42'
//             , '#320729', '#2b002c', '#1b0027', '#000000']
//     },
//     {
//         type: 'Earth', colors: ['#ff1700', '#000dd0', '#00a8ff', '#f08100'
//             , '#d400f0', '#ffe600', '#00bf0b', '#00770d'
//             , '#007a06', '#005406', '#003e08', '#002a04'
//             , '#46006a', '#1d002c', '#180027', '#000000']
//     }
// ]
// }