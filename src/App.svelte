<script>
  import Month from "./components/Month.svelte";
  import LeftArrow from "./svgs/LeftArrow.svelte";
  import RightArrow from "./svgs/RightArrow.svelte";
  import { getMonthsByYear, NUM_MONTHS, NUM_WEEKDAYS } from "./util.js";
  import { currentDate } from "./stores.js";

  $: currentYearMonths = getMonthsByYear($currentDate.scrub.year);

  $: prevMonth =
    currentYearMonths[($currentDate.scrub.month - 1 + NUM_MONTHS) % NUM_MONTHS];
  $: currentMonth = currentYearMonths[$currentDate.scrub.month];
  $: nextMonth = currentYearMonths[($currentDate.scrub.month + 1) % NUM_MONTHS];

  // Methods for month scrubbing

  function scrubNextMonth() {
    const tmpMonthIdx = $currentDate.scrub.month + 1;

    if (tmpMonthIdx >= NUM_MONTHS) {
      $currentDate.scrub.year += 1;
      $currentDate.scrub.month = 0;
    } else {
      $currentDate.scrub.month += 1;
    }
  }

  function scrubPrevMonth() {
    const tmpMonthIdx = $currentDate.scrub.month - 1;

    if (tmpMonthIdx < 0) {
      $currentDate.scrub.year -= 1;
      $currentDate.scrub.month = NUM_MONTHS - 1;
    } else {
      $currentDate.scrub.month -= 1;
    }
  }

  const advanceByDays = days => {};

  const reduceByDays = days => {};
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
    padding-top: 0.9em;
  }

  .monthName {
    font-size: 1.5em;
  }

  .yearNumber {
    background: none;
    border: none;
    font-size: 1.5em;
    width: 4.5ch;
    text-align: center;
    text-decoration: underline;
  }

  .navigation {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .navigation button {
    flex-grow: 1;
  }

  .weekNavigation {
    display: flex;
    flex-direction: row;
  }

  .dayNavigation {
    display: flex;
    flex-direction: row;
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
        bind:value={$currentDate.scrub.year} />
    </div>
    <button class="scrub" on:click={scrubNextMonth}>
      <RightArrow />
    </button>
  </nav>

  <Month month={currentMonth} />

  <nav class="navigation">
    <div class="weekNavigation">
      <button class="prev">-Week</button>
      <button class="next">+Week</button>
    </div>
    <div class="dayNavigation">
      <button class="prev">-Day</button>
      <button class="next">+Day</button>
    </div>
  </nav>
</main>
