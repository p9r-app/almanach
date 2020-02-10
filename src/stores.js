import { writable } from "svelte/store";
import { saveToHash, loadFromHash } from "./util.js";

function createHashState() {
  let state = loadFromHash();

  if (!state) {
    state = { year: 2400, month: 0, day: 0 };
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
