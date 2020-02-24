import { writable } from "svelte/store";
import { saveToHash, loadFromHash, DateState } from "./util";
import { reverseRenderSlices } from "./constants";

function createHashState() {
  let state = loadFromHash();

  if (!state) {
    state = new DateState(2480, 0);
  } else {
    state = new DateState(state.year, state.entityIdx, state.day);
  }

  const scrubStore = writable({
    year: state.year,
    month: reverseRenderSlices[state.entityIdx]
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
