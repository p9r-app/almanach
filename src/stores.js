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
      year: 2480,
      ...createIntercalaryHoliday(intercalaryHolidayNames.HEXENTAG)
    };
  }

  const scrubStore =
    state.entityType === timeEntityTypes.MONTH
      ? writable({
          year: state.year,
          month: state.month
        })
      : writable({
          year: state.year,
          month: intercalaryHolidayMonths[state.day]
        });

  const { subscribe, set } = writable(state);

  const dateStore = {
    subscribe,
    set: state => {
      saveToHash(state);
      set(state);
    }
  };

  return [dateStore, scrubStore];
}

const [dateStore, scrubStore] = createHashState();

export const currentDate = dateStore;

export const currentScrub = scrubStore;
