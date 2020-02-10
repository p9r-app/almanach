import { writable } from "svelte/store";
import { saveToHash, loadFromHash } from "./util.js";

function createHashState() {
  let state = loadFromHash();

  if (!state) {
    state = {
      date: { year: 2400, month: 0, day: 0 }
    };
  }

  state.scrub = { year: state.date.year, month: state.date.month };

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
