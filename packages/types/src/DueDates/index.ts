
export enum DUE_DATE {
    LATE = "PAST DUE",
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    WEEK = "Next Week",
    TWO_WEEKS = "2 Weeks from now",
    THREE_WEEKS = "3 Weeks from now",
    MONTH = "Next Month",
    TWO_MONTHS = "2 Months from now",
    QUARTER = "Next Quarter",
    TWO_QUARTERS = "2 Quarters from now",
    THREE_QUARTERS = "3 Quarters from now",
    YEAR = 'Next Year',
    TWO_YEARS = '2 Years from now',
    THREE_YEARS = '3 Years from now',
    FAR_FUTURE = 'FAR FUTURE'
}

export type THRESHOLD = {
    value: number,
    unit: 'days' | 'weeks' | 'months' | 'years',
    result: DUE_DATE
}
export type SELECTABLE_DUE_DATES = THRESHOLD[]
export type SELECTABLE_DUE_DATE_OPTION = 'today' | 'shorten' | 'standard' | 'extended'
