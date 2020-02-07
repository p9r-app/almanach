// Returns a zero-based index of the current series
const seriesByYear = year => year % 4;

// Returns the offset of the weekdays at the beginning of the year
const weekdayOffsetByYear = year => seriesByYear(year) * 2;

// The number of days per week
export const NUM_WEEKDAYS = 8;

// Returns all the data needed to display a whole year
export const getMonthsByYear = year => {
  const initialOffset = weekdayOffsetByYear(year);

  return [
    {
      name: "Nachhexen",
      numberOfDays: 32,
      weekdayOffset: initialOffset % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: true, name: "Hexentag" }
    }, // 0
    {
      name: "Jahrdrung",
      numberOfDays: 33,
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 1
    {
      name: "Pflugzeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: false, name: "Mitterfruhl" }
    }, // 2
    {
      name: "Sigmarzeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 2) % NUM_WEEKDAYS
    }, // 3
    {
      name: "Sommerzeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 3) % NUM_WEEKDAYS
    }, // 4
    {
      name: "Vorgeheim",
      numberOfDays: 32,
      weekdayOffset: (initialOffset + 4) % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: false, name: "Sonnstill" }
    }, // 5
    {
      name: "Nachgeheim",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: true, name: "Geheimnistag" }
    }, // 6
    {
      name: "Erntezeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 5) % NUM_WEEKDAYS
    }, // 7
    {
      name: "Brauzeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 6) % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: false, name: "Mittherbst" }
    }, // 8
    {
      name: "Kaldezeit",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 7) % NUM_WEEKDAYS
    }, // 9
    {
      name: "Ulriczeit",
      numberOfDays: 33,
      weekdayOffset: initialOffset % NUM_WEEKDAYS
    }, // 10
    {
      name: "Vorhexen",
      numberOfDays: 33,
      weekdayOffset: (initialOffset + 1) % NUM_WEEKDAYS,
      intercalaryHoliday: { morr: false, name: "Monstille" }
    } // 11
  ];
};
