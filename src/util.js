import { monthNames, intercalaryHolidayNames } from "./constants.js";

// Returns a zero-based index of the current series
const seriesByYear = year => year % 4;

// Returns the offset of the weekdays at the beginning of the year
const weekdayOffsetByYear = year => seriesByYear(year) * 2;

// The number of days per week
export const NUM_WEEKDAYS = 8;

// The number of months
export const NUM_MONTHS = 12;

export const MOON_PASE_NEW = "new";
export const MOON_PASE_FULL = "full";

// Returns all the data needed to display a whole year
export const getMonthsByYear = (year = 1000) => {
  const initialOffset = weekdayOffsetByYear(year);

  return [
    {
      name: monthNames.NACHHEXEN,
      numberOfDays: 32,
      moonPhases: { 12: MOON_PASE_NEW, 24: MOON_PASE_FULL },
      weekdayOffset: initialOffset % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: true, name: intercalaryHolidayNames.HEXENTAG }
    }, // 0
    {
      name: monthNames.JAHRDRUNG,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 1
    {
      name: monthNames.PFLUGZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS,
      intercalaryHoliday: {
        morr: false,
        name: intercalaryHolidayNames.MITTERFRUHL
      }
    }, // 2
    {
      name: monthNames.SIGMARZEIT,
      numberOfDays: 33,
      moonPhases: { 1: MOON_PASE_FULL, 13: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 2) % NUM_WEEKDAYS
    }, // 3
    {
      name: monthNames.SOMMERZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 3) % NUM_WEEKDAYS
    }, // 4
    {
      name: monthNames.VORGEHEIM,
      numberOfDays: 32,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 4) % NUM_WEEKDAYS,
      intercalaryHoliday: {
        morr: false,
        name: intercalaryHolidayNames.SONNSTILL
      }
    }, // 5
    {
      name: monthNames.NACHGEHEIM,
      numberOfDays: 33,
      moonPhases: { 12: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS,
      intercalaryHoliday: {
        morr: true,
        name: intercalaryHolidayNames.GEHEIMNISTAG
      }
    }, // 6
    {
      name: monthNames.ERNTEZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 7
    {
      name: monthNames.BRAUZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 6) % NUM_WEEKDAYS,
      intercalaryHoliday: {
        morr: false,
        name: intercalaryHolidayNames.MITTHERBST
      }
    }, // 8
    {
      name: monthNames.KALDEZEIT,
      numberOfDays: 33,
      moonPhases: { 0: MOON_PASE_FULL, 13: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 7) % NUM_WEEKDAYS
    }, // 9
    {
      name: monthNames.ULRICZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 10
    {
      name: monthNames.VORHEXEN,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS,
      intercalaryHoliday: {
        morr: false,
        name: intercalaryHolidayNames.MONSTILLE
      }
    } // 11
  ];
};
