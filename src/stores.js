import { writable } from "svelte/store";
import { saveToHash, loadFromHash, createIntercalaryHoliday } from "./util.js";
import {
  timeEntityTypes,
  intercalaryHolidayNames,
  intercalaryHolidayMonths
} from "./constants.js";

function createHashState() {
  let state = loadFromHash();

  if (!state) {
    state = {
      date: {
        year: 2400,
        ...createIntercalaryHoliday(intercalaryHolidayNames.HEXENTAG)
      }
    };
  }

  if (state.date.entityType === timeEntityTypes.MONTH) {
    state.scrub = {
      year: state.date.year,
      month: state.date.month
    };
  } else {
    state.scrub = {
      year: state.date.year,
      month: intercalaryHolidayMonths[state.date.day]
    };
  }

  const { subscribe, set } = writable(state);

  return {
    subscribe,
    set: state => {
      saveToHash(state);
      set(state);
    }
  };
}

export const currentDate = createHashState();
