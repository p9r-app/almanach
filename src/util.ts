import {
  MonthName,
  IntercalaryHolidayName,
  TimeEntityKind,
  YEAR_CYCLE_LENGTH,
  NUM_WEEKDAYS
} from "./constants";

// Returns a zero-based index of the current series
const seriesByYear = year => year % YEAR_CYCLE_LENGTH;

// Returns the offset of the weekdays at the beginning of the year
const weekdayOffsetByYear = year => seriesByYear(year) * 2;

export const NUM_TIME_ENTITIES = 18;

export const MOON_PASE_NEW: MoonPhase = "new";
export const MOON_PASE_FULL: MoonPhase = "full";

export type MoonPhase = "new" | "full";

export interface IntercalaryHolidayTimeEntity {
  entityType: "INTERCALARY_HOLIDAY";
  name: IntercalaryHolidayName;
  morr: boolean;
}

export interface MonthTimeEntity {
  entityType: "MONTH";
  name: MonthName;
  numberOfDays: number;
  moonPhases: MoonPhases;
  weekdayOffset: number;
}

export interface MoonPhases {
  [key: number]: MoonPhase;
}

export type TimeEntity = IntercalaryHolidayTimeEntity | MonthTimeEntity;

// Returns all the data needed to display a whole year
export function getMonthsByYear(year = 1000): Array<TimeEntity> {
  const initialOffset = weekdayOffsetByYear(year);

  return [
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.HEXENTAG,
      morr: true
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.NACHHEXEN,
      numberOfDays: 32,
      moonPhases: { 12: MOON_PASE_NEW, 24: MOON_PASE_FULL },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 0
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.JAHRDRUNG,
      numberOfDays: 33,
      moonPhases: {
        5: MOON_PASE_NEW,
        17: MOON_PASE_FULL,
        30: MOON_PASE_NEW
      },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 1
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.MITTERFRUHL,
      morr: false
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.PFLUGZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS
    }, // 2
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.SIGMARZEIT,
      numberOfDays: 33,
      moonPhases: {
        1: MOON_PASE_FULL,
        13: MOON_PASE_NEW,
        25: MOON_PASE_FULL
      },
      weekdayOffset: (initialOffset + 2) % NUM_WEEKDAYS
    }, // 3
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.SOMMERZEIT,
      numberOfDays: 33,
      moonPhases: {
        5: MOON_PASE_NEW,
        17: MOON_PASE_FULL,
        30: MOON_PASE_NEW
      },
      weekdayOffset: (initialOffset + 3) % NUM_WEEKDAYS
    }, // 4
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.SONNSTILL,
      morr: false
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.VORGEHEIM,
      numberOfDays: 32,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 4) % NUM_WEEKDAYS
    }, // 5
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.GEHEIMNISTAG,
      morr: true
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.NACHGEHEIM,
      numberOfDays: 33,
      moonPhases: { 12: MOON_PASE_NEW, 25: MOON_PASE_FULL },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 6
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.ERNTEZEIT,
      numberOfDays: 33,
      moonPhases: {
        5: MOON_PASE_NEW,
        17: MOON_PASE_FULL,
        30: MOON_PASE_NEW
      },
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 7
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.MITTHERBST,
      morr: false
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.BRAUZEIT,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 6) % NUM_WEEKDAYS
    }, // 8
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.KALDEZEIT,
      numberOfDays: 33,
      moonPhases: {
        0: MOON_PASE_FULL,
        13: MOON_PASE_NEW,
        25: MOON_PASE_FULL
      },
      weekdayOffset: (initialOffset + 7) % NUM_WEEKDAYS
    }, // 9
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.ULRICZEIT,
      numberOfDays: 33,
      moonPhases: {
        5: MOON_PASE_NEW,
        17: MOON_PASE_FULL,
        30: MOON_PASE_NEW
      },
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 10
    {
      entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
      name: IntercalaryHolidayName.MONSTILLE,
      morr: false
    },
    {
      entityType: TimeEntityKind.MONTH,
      name: MonthName.VORHEXEN,
      numberOfDays: 33,
      moonPhases: { 8: MOON_PASE_FULL, 21: MOON_PASE_NEW },
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS
    } // 11
  ];
}

export interface CurrentDateStateMonth {
  year: number;
  entity: MonthTimeEntity;
}
export interface CurrentDateStateIntercalaryHoliday {
  year: number;
  entity: IntercalaryHolidayTimeEntity;
  day: string;
}

// constructors for time entites
export const createMonth = (month, day) => ({
  entityType: TimeEntityKind.MONTH,
  month,
  day
});

export const createIntercalaryHoliday = day => ({
  entityType: TimeEntityKind.INTERCALARY_HOLIDAY,
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
