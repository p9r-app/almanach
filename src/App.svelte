<script>
  import Month from "./components/Month.svelte";
  import LeftArrow from "./svgs/LeftArrow.svelte";
  import RightArrow from "./svgs/RightArrow.svelte";
  import IntercalaryHoliday from "./components/IntercalaryHoliday.svelte";

  import {
    getMonthsByYear,
    createIntercalaryHoliday,
    createMonth
  } from "./util.ts";
  import {
    renderSlices,
    TimeEntityKind,
    NUM_MONTHS,
    NUM_WEEKDAYS,
    IntercalaryHolidayName,
    reverseRenderSlices
  } from "./constants.ts";
  import { currentDate, currentScrub } from "./stores.js";

  $: previousYearMonths = getMonthsByYear($currentScrub.year - 1);
  $: currentYearMonths = getMonthsByYear($currentScrub.year);
  $: nextYearMonths = getMonthsByYear($currentScrub.year + 1);

  $: currentRenderSet = renderSlices[$currentScrub.month].map(
    slice => currentYearMonths[slice]
  );

  $: currentMonth =
    currentRenderSet.length > 1 ? currentRenderSet[1] : currentRenderSet[0];

  $: currentIntercalaryHoliday =
    currentRenderSet.length > 1 ? currentRenderSet[0] : null;

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

  function advanceByDays(days) {
    let currentDateCopy = $currentDate;

    for (let index = 0; index < days; index += 1) {
      if (currentDateCopy.entityType === TimeEntityKind.INTERCALARY_HOLIDAY) {
      } else {
        // Is it the last month of the year?
        if (
          currentDateCopy.month === NUM_MONTHS - 1 &&
          currentDateCopy.day === 32
        ) {
          currentDateCopy = {
            year: currentDateCopy.year + 1,
            ...createIntercalaryHoliday(IntercalaryHolidayName.HEXENTAG)
          };
        } else if (
          currentDateCopy.month < NUM_MONTHS - 1 &&
          currentDateCopy.day < currentYearMonths
        ) {
          //
        }
      }
    }

    $currentDate = currentDateCopy;
  }

  function impedeByDays(days) {
    const currentDateCopy = $currentDate;

    if (currentDateCopy.entityType === TimeEntityKind.INTERCALARY_HOLIDAY) {
    }

    $currentDate = currentDateCopy;
  }
</script>

<style>
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
    text-align: center;
    padding-top: 0.5em;
  }

  .monthName {
    font-size: 1.5em;
  }

  .yearNumber {
    background: none;
    border: none;
    font-size: 1.5em;
    width: 3.5em;
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
    <IntercalaryHoliday holiday={currentIntercalaryHoliday} />
  {/if}

  <Month month={currentMonth} />

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
