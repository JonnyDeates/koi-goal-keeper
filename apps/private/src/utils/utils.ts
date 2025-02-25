import dayjs from "dayjs";
import {CSSProperties} from "react";
import {DUE_DATE, SELECTABLE_DUE_DATE_OPTION, SELECTABLE_DUE_DATES, THRESHOLD} from "@repo/types";

const AllSelectableDueDate: Record<DUE_DATE, THRESHOLD> = {
    [DUE_DATE.LATE]: {value: -Infinity, unit: 'days', result: DUE_DATE.LATE},
    [DUE_DATE.TODAY]: {value: 0, unit: 'days', result: DUE_DATE.TODAY},
    [DUE_DATE.TOMORROW]: {value: 1, unit: 'days', result: DUE_DATE.TOMORROW},
    [DUE_DATE.WEEK]: {value: 1, unit: 'weeks', result: DUE_DATE.WEEK},
    [DUE_DATE.TWO_WEEKS]: {value: 2, unit: 'weeks', result: DUE_DATE.TWO_WEEKS},
    [DUE_DATE.THREE_WEEKS]: {value: 3, unit: 'weeks', result: DUE_DATE.THREE_WEEKS},
    [DUE_DATE.MONTH]: {value: 1, unit: 'months', result: DUE_DATE.MONTH},
    [DUE_DATE.TWO_MONTHS]: {value: 2, unit: 'months', result: DUE_DATE.TWO_MONTHS},
    [DUE_DATE.QUARTER]: {value: 3, unit: 'months', result: DUE_DATE.QUARTER},
    [DUE_DATE.TWO_QUARTERS]: {value: 6, unit: 'months', result: DUE_DATE.TWO_QUARTERS},
    [DUE_DATE.THREE_QUARTERS]: {value: 9, unit: 'months', result: DUE_DATE.THREE_QUARTERS},
    [DUE_DATE.YEAR]: {value: 1, unit: 'years', result: DUE_DATE.YEAR},
    [DUE_DATE.TWO_YEARS]: {value: 2, unit: 'years', result: DUE_DATE.TWO_YEARS},
    [DUE_DATE.THREE_YEARS]: {value: 3, unit: 'years', result: DUE_DATE.THREE_YEARS},
    [DUE_DATE.FAR_FUTURE]: {value: Infinity, unit: 'years', result: DUE_DATE.FAR_FUTURE},
}
const SelectableDueDate = (selectableDateOption: SELECTABLE_DUE_DATE_OPTION): SELECTABLE_DUE_DATES => {
    const {
        [DUE_DATE.LATE]: late,
        [DUE_DATE.TODAY]: today,
        [DUE_DATE.TOMORROW]: tomorrow,
        [DUE_DATE.WEEK]: week,
        [DUE_DATE.TWO_WEEKS]: twoWeeks,
        [DUE_DATE.THREE_WEEKS]: threeWeeks,
        [DUE_DATE.MONTH]: month,
        [DUE_DATE.TWO_MONTHS]: twoMonths,
        [DUE_DATE.QUARTER]: quarter,
        [DUE_DATE.TWO_QUARTERS]: twoQuarters,
        [DUE_DATE.THREE_QUARTERS]: threeQuarters,
        [DUE_DATE.YEAR]: year,
        [DUE_DATE.TWO_YEARS]: twoYears,
        [DUE_DATE.THREE_YEARS]: threeYears,
        [DUE_DATE.FAR_FUTURE]: farFuture
    } = AllSelectableDueDate

    switch (selectableDateOption) {
        case 'today': {
            return [today]
        }
        case "shorten": {
            return [today, week, month, quarter, year]
        }
        case "standard": {
            return [today, tomorrow, week, twoWeeks, month, quarter, twoQuarters, year, twoYears]
        }
        case "extended": {
            return [today, tomorrow, week, twoWeeks, threeWeeks, month, twoMonths, quarter, twoQuarters, threeQuarters, year, twoYears, threeYears];
        }
    }
}

export const allSelectableDueDates: SELECTABLE_DUE_DATE_OPTION[] = ['today', 'shorten', 'standard', 'extended'];

export const thresholdsForDueDates =
    (selectedDueDateOptions: SELECTABLE_DUE_DATE_OPTION) => SelectableDueDate(selectedDueDateOptions);

export const allDueDatesOfSelectedOption =
    (selectedDueDateOptions: SELECTABLE_DUE_DATE_OPTION): DUE_DATE[] => SelectableDueDate(selectedDueDateOptions)
        .map(x => x.result);

export const allDueDates = () => Object.keys(AllSelectableDueDate) as DUE_DATE[]

export const getDateFromDueDate = (currentDueDate: DUE_DATE): Date => {
    const selectedThreshold = AllSelectableDueDate[currentDueDate]
    return dayjs().add(selectedThreshold.value, selectedThreshold.unit).toDate()
};
export const getDueDateFromDate = (selectedThreshold: SELECTABLE_DUE_DATE_OPTION, date: Date): DUE_DATE => {
    const currentDate = dayjs(date);
    const TodayDate = dayjs(new Date());

    if (currentDate.isBefore(TodayDate, 'day')) return DUE_DATE.LATE;

    if (currentDate.isSame(TodayDate, 'day')) return DUE_DATE.TODAY;

    const thresholds: THRESHOLD[] = thresholdsForDueDates(selectedThreshold)

    for (const threshold of thresholds) {
        const addTime = dayjs(TodayDate).add(threshold.value, threshold.unit);
        if (currentDate.isBefore(addTime) || currentDate.isSame(addTime)) return threshold.result;
    }
    return DUE_DATE.FAR_FUTURE;


};
type ColorSelectionOptions = 'Default'

type ColorType = Record<ColorSelectionOptions, Record<DUE_DATE, Pick<CSSProperties, 'color' | 'backgroundColor'>>>

export const ColorSelection: ColorType = (
    {
        Default: {
            [DUE_DATE.TODAY]: {backgroundColor: '#007a0e'},
            [DUE_DATE.TOMORROW]: {backgroundColor: "#4fc300"},
            [DUE_DATE.WEEK]: {backgroundColor: "#65ff00"},
            [DUE_DATE.TWO_WEEKS]: {backgroundColor: "#a4f000"},
            [DUE_DATE.THREE_WEEKS]: {backgroundColor: "#c7f000"},
            [DUE_DATE.MONTH]: {backgroundColor: "#f0ca00"},
            [DUE_DATE.TWO_MONTHS]: {backgroundColor: "#f0bc00"},
            [DUE_DATE.QUARTER]: {backgroundColor: "#e57f00"},
            [DUE_DATE.TWO_QUARTERS]: {backgroundColor: "#d76d00"},
            [DUE_DATE.THREE_QUARTERS]: {backgroundColor: "#cc6103"},
            [DUE_DATE.YEAR]: {backgroundColor: "#d32000"},
            [DUE_DATE.TWO_YEARS]: {backgroundColor: "#d31900"},
            [DUE_DATE.THREE_YEARS]: {backgroundColor: "#af0000"},
            [DUE_DATE.FAR_FUTURE]: {backgroundColor: "white", color: 'black'},
            [DUE_DATE.LATE]: {backgroundColor: "black", color: 'white'}
        }
    }
);


export const findNextElementInListToFocusOn = (tasksListOfIds: string[], index = -1) => {
    for (let x = index + 1; x < tasksListOfIds.length; x++) {
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


