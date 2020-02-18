import {
  monthNames,
  intercalaryHolidayNames,
  timeEntityTypes,
  YEAR_CYCLE_LENGTH,
  NUM_WEEKDAYS
} from "./constants.js";

// Returns a zero-based index of the current series
const seriesByYear = year => year % YEAR_CYCLE_LENGTH;

// Returns the offset of the weekdays at the beginning of the year
const weekdayOffsetByYear = year => seriesByYear(year) * 2;

export const NUM_TIME_ENTITIES = 18;

export const MOON_PASE_NEW = "new";
export const MOON_PASE_FULL = "full";

// Returns all the data needed to display a whole year
export const getMonthsByYear = (year = 1000) => {
  const initialOffset = weekdayOffsetByYear(year);

  return [
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.HEXENTAG,
      morr: true
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.NACHHEXEN,
      numberOfDays: 32,
      moonPhases: { 12: MOON_PASE_NEW, 24: MOON_PASE_FULL },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 0
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.JAHRDRUNG,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 1
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.MITTERFRUHL,
      morr: false
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.PFLUGZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS
    }, // 2
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.SIGMARZEIT,
      numberOfDays: 33,
      moonPhases: { 1: MOON_PASE_FULL, 13: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 2) % NUM_WEEKDAYS
    }, // 3
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.SOMMERZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 3) % NUM_WEEKDAYS
    }, // 4
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.SONNSTILL,
      morr: false
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.VORGEHEIM,
      numberOfDays: 32,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 4) % NUM_WEEKDAYS
    }, // 5
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.GEHEIMNISTAG,
      morr: true
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.NACHGEHEIM,
      numberOfDays: 33,
      moonPhases: { 12: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 6
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.ERNTEZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 7
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.MITTHERBST,
      morr: false
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.BRAUZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 6) % NUM_WEEKDAYS
    }, // 8
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.KALDEZEIT,
      numberOfDays: 33,
      moonPhases: { 0: MOON_PASE_FULL, 13: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 7) % NUM_WEEKDAYS
    }, // 9
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.ULRICZEIT,
      numberOfDays: 33,
      moonPhases: { 5: MOON_PASE_NEW, 17: MOON_PASE_FULL, 30: MOON_PASE_NEW },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 10
    {
      entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
      name: intercalaryHolidayNames.MONSTILLE,
      morr: false
    },
    {
      entityType: timeEntityTypes.MONTH,
      name: monthNames.VORHEXEN,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS
    } // 11
  ];
};

// constructors for time entites
export const createMonth = (month, day) => ({
  entityType: timeEntityTypes.MONTH,
  month,
  day
});

export const createIntercalaryHoliday = day => ({
  entityType: timeEntityTypes.INTERCALARY_HOLIDAY,
  day
});

// save and load mechanic

export const saveToHash = state => {
  window.location.hash = btoa(JSON.stringify(state));
};

export const loadFromHash = () => {
  if (window.location.hash.length > 0) {
    const base = atob(window.location.hash.slice(1));

    if (base.length > 0) {
      return JSON.parse(base);
    }
  }

  return null;
};
