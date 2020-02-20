export const NUM_DAYS_PER_YEAR = 400;

export const YEAR_CYCLE_LENGTH = 4;

// The number of days per week
export const NUM_WEEKDAYS = 8;

// The number of months
export const NUM_MONTHS = 12;

export const monthNames = {
  NACHHEXEN: "Nachhexen",
  JAHRDRUNG: "Jahrdrung",
  PFLUGZEIT: "Pflugzeit",
  SIGMARZEIT: "Sigmarzeit",
  SOMMERZEIT: "Sommerzeit",
  VORGEHEIM: "Vorgeheim",
  NACHGEHEIM: "Nachgeheim",
  ERNTEZEIT: "Erntezeit",
  BRAUZEIT: "Brauzeit",
  KALDEZEIT: "Kaldezeit",
  ULRICZEIT: "Ulriczeit",
  VORHEXEN: "Vorhexen"
};

export const intercalaryHolidayNames = {
  HEXENTAG: "Hexentag",
  MITTERFRUHL: "Mitterfruhl",
  SONNSTILL: "Sonnstill",
  GEHEIMNISTAG: "Geheimnistag",
  MITTHERBST: "Mittherbst",
  MONSTILLE: "Monstille"
};

export enum TimeEntityKind {
  MONTH = "MONTH",
  INTERCALARY_HOLIDAY = "INTERCALARY_HOLIDAY"
}

export const renderSlices = [
  [0, 1], // "Nachhexen"
  [2], // "Jahrdrung"
  [3, 4], // "Pflugzeit"
  [5], // "Sigmarzeit"
  [6], // "Sommerzeit"
  [7, 8], // "Vorgeheim"
  [9, 10], // "Nachgeheim"
  [11], // "Erntezeit"
  [12, 13], // "Brauzeit"
  [14], // "Kaldezeit"
  [15], // "Ulriczeit"
  [16, 17] // "Vorhexen"
];

export const reverseRenderSlices = renderSlices.reduce(
  (obj, slice, idx) =>
    slice.length == 1
      ? { ...obj, [slice[0]]: idx }
      : { ...obj, [slice[0]]: idx, [slice[1]]: idx },
  {}
);

export const intercalaryHolidayMonths = {
  [intercalaryHolidayNames.HEXENTAG]: 0,
  [intercalaryHolidayNames.MITTERFRUHL]: 2,
  [intercalaryHolidayNames.SONNSTILL]: 5,
  [intercalaryHolidayNames.GEHEIMNISTAG]: 6,
  [intercalaryHolidayNames.MITTHERBST]: 8,
  [intercalaryHolidayNames.MONSTILLE]: 11
};
