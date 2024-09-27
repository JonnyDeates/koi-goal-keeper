import dayjs from "dayjs";


export enum DUE_DATE {
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
  CUSTOM = "Custom"
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
  DUE_DATE.CUSTOM
];

export const allDueDatesAndDates = (): Record<DUE_DATE, Date | null> => {
  return allDueDates().reduce<Record<DUE_DATE, Date | null>>((yeet, dueDate) => {
    yeet[dueDate] = getDateFromDueDate(dueDate);
    return yeet;
  }, {});
};

export const getDateFromDueDate = (currentDueDate: DUE_DATE): Date | null => {
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
    default:
      return null;
  }

};

export const getDueDateFromDate = (currentDate: Date): DUE_DATE => {
  const dayJsDate = dayjs(currentDate);

  if (dayJsDate.isBefore(dayjs().add(1, 'day')))
    return DUE_DATE.TODAY;
  if (dayJsDate.isBefore(dayjs().add(2, 'day')))
    return DUE_DATE.TOMORROW;
  if (dayJsDate.isBefore(dayjs().add(2, 'week')))
    return DUE_DATE.WEEK;
  if (dayJsDate.isBefore(dayjs().add(3, 'week')))
    return DUE_DATE.TWO_WEEKS;
  if (dayJsDate.isBefore(dayjs().add(2, 'month')))
    return DUE_DATE.MONTH;
  if (dayJsDate.isBefore(dayjs().add(3, 'month')))
    return DUE_DATE.TWO_MONTHS;
  if (dayJsDate.isBefore(dayjs().add(4, 'month')))
    return DUE_DATE.QUARTER;
  if (dayJsDate.isBefore(dayjs().add(7, 'month')))
    return DUE_DATE.SIX_MONTHS;
  if (dayJsDate.isBefore(dayjs().add(2, 'year')))
    return DUE_DATE.YEAR;
  if (dayJsDate.isBefore(dayjs().add(3, 'year')))
    return DUE_DATE.TWO_YEARS;
  return DUE_DATE.CUSTOM;


};