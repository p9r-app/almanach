// Returns a zero-based index of the current series
export const seriesByYear = year => year % 4;

// Returns the offset of the weekdays at the beginning of the year
export const weekdayOffsetByYear = year => seriesByYear(year) * 2;

// Helper method for obtaining the special holidays. Returns: { morr: Boolean, name: string } | undefined
export const getIntercalaryHoliday = monthIdx =>
  MONTHS[monthIdx].intercalaryHoliday;

// An array that maps the index of the month to its properties
export const MONTHS = [
  {
    name: "Nachhexen",
    numberOfDays: 32,
    intercalaryHoliday: { morr: true, name: "Hexentag" }
  }, // 0
  { name: "Jahrdrung", numberOfDays: 33 }, // 1
  {
    name: "Pflugzeit",
    numberOfDays: 33,
    intercalaryHoliday: { morr: false, name: "Mitterfruhl" }
  }, // 2
  { name: "Sigmarzeit", numberOfDays: 33 }, // 3
  {
    name: "Sommerzeit",
    numberOfDays: 33
  }, // 4
  {
    name: "Vorgeheim",
    numberOfDays: 32,
    intercalaryHoliday: { morr: false, name: "Sonnstill" }
  }, // 5
  {
    name: "Nachgeheim",
    numberOfDays: 33,
    intercalaryHoliday: { morr: true, name: "Geheimnistag" }
  }, // 6
  {
    name: "Erntezeit",
    numberOfDays: 33
  }, // 7
  {
    name: "Brauzeit",
    numberOfDays: 33,
    intercalaryHoliday: { morr: false, name: "Mittherbst" }
  }, // 8
  { name: "Kaldezeit", numberOfDays: 33 }, // 9
  {
    name: "Ulriczeit",
    numberOfDays: 33
  }, // 10
  {
    name: "Vorhexen",
    numberOfDays: 33,
    intercalaryHoliday: { morr: false, name: "Monstille" }
  } // 11
];
