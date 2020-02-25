<script>
  import Month from "./components/Month.svelte";
  import LeftArrow from "./svgs/LeftArrow.svelte";
  import RightArrow from "./svgs/RightArrow.svelte";
  import IntercalaryHoliday from "./components/IntercalaryHoliday.svelte";

  import { getMonthsByYear } from "./util.ts";
  import {
    renderSlices,
    reverseRenderSlices,
    NUM_MONTHS,
    NUM_WEEKDAYS
  } from "./constants.ts";
  import { currentDate, currentScrub } from "./stores.js";

  $: currentYearMonths = getMonthsByYear($currentScrub.year);

  $: currentRenderSet = renderSlices[$currentScrub.month].map(slice => [
    currentYearMonths[slice],
    slice
  ]);

  $: [currentMonth, currentMonthEntityIdx] =
    currentRenderSet.length > 1 ? currentRenderSet[1] : currentRenderSet[0];

  $: [currentIntercalaryHoliday, currentIntercalaryHolidayEntityIdx] =
    currentRenderSet.length > 1 ? currentRenderSet[0] : [null, null];

  // Methods for month scrubbing

  function scrubNextMonth() {
    const scrub = $currentScrub;

    if (scrub.month + 1 >= NUM_MONTHS) {
      scrub.year += 1;
      scrub.month = 0;
    } else {
      scrub.month += 1;
    }

    $currentScrub = scrub;
  }

  function scrubPrevMonth() {
    const scrub = $currentScrub;

    if (scrub.month - 1 < 0) {
      scrub.year -= 1;
      scrub.month = NUM_MONTHS - 1;
    } else {
      scrub.month -= 1;
    }

    $currentScrub = scrub;
  }

  function advanceByDays(num) {
    const date = $currentDate;

    date.nextDays(num);

    $currentDate = date;
    $currentScrub = {
      year: $currentDate.year,
      month: reverseRenderSlices[$currentDate.entityIdx]
    };
  }

  function impedeByDays(num) {
    const date = $currentDate;

    date.previousDays(num);

    $currentDate = date;
    $currentScrub = {
      year: $currentDate.year,
      month: reverseRenderSlices[$currentDate.entityIdx]
    };
  }
</script>

<style>
  button {
    touch-action: manipulation;
  }

  .scrubbing {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: var(--light-gray);
  }

  .scrub {
    border: none;
    background: none;
    padding: 1.5em 2em;
    flex-grow: 1;
  }

  .monthYearDisplay {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-0.1em);
  }

  .monthName {
    font-size: 1.5em;
  }

  .yearNumber {
    background: none;
    border: none;
    font-size: 1.5em;
    padding: 0;
    width: 4.5ch;
    text-align: center;
    text-decoration: underline;
  }

  .navigation {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 1em;
  }

  .weekNavigation {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
  }

  .dayNavigation {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
  }

  .navigation button {
    padding: 0.5em;
    text-align: center;
    background: var(--dark-gray);
    border: none;
    font-size: 1.25em;
    width: 40%;
  }

  .navigation > * {
    display: flex;
    justify-content: space-between;
  }

  .navigation button:active {
    background: var(--selection-green);
  }

  .navigation button:focus {
    background: var(--light-selection-green);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>

<main>
  <nav class="scrubbing">
    <button class="scrub" on:click={scrubPrevMonth}>
      <LeftArrow />
    </button>
    <div class="monthYearDisplay">
      <span class="monthName">{currentMonth.name}</span>
      <input
        class="yearNumber"
        type="number"
        min={1000}
        step={1}
        pattern="\d*"
        bind:value={$currentScrub.year} />
    </div>
    <button class="scrub" on:click={scrubNextMonth}>
      <RightArrow />
    </button>
  </nav>

  {#if currentIntercalaryHoliday}
    <IntercalaryHoliday
      holiday={currentIntercalaryHoliday}
      timeEntityIdx={currentIntercalaryHolidayEntityIdx} />
  {/if}

  <Month month={currentMonth} timeEntityIdx={currentMonthEntityIdx} />

  <nav class="navigation">
    <div class="weekNavigation">
      <button class="prev" on:click={() => impedeByDays(NUM_WEEKDAYS)}>
        Previous week
      </button>
      <button class="next" on:click={() => advanceByDays(NUM_WEEKDAYS)}>
        Next week
      </button>
    </div>
    <div class="dayNavigation">
      <button class="prev" on:click={() => impedeByDays(1)}>
        Previous day
      </button>
      <button class="next" on:click={() => advanceByDays(1)}>Next day</button>
    </div>
  </nav>
</main>
