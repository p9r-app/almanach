<script>
  import Month from "./components/Month.svelte";
  import LeftArrow from "./svgs/LeftArrow.svelte";
  import RightArrow from "./svgs/RightArrow.svelte";
  import { getMonthsByYear, NUM_MONTHS, NUM_WEEKDAYS } from "./util.js";
  import { currentDate } from "./stores.js";

  let currentYear = 2480;

  let currentMonthIdx = 0;

  $: currentYearMonths = getMonthsByYear(currentYear);
  $: currentMonth = currentYearMonths[currentMonthIdx];

  // Methods for month scrubbing

  const nextMonth = () => {
    const tmpMonthIdx = currentMonthIdx + 1;

    if (tmpMonthIdx >= NUM_MONTHS) {
      currentYear += 1;
      currentMonthIdx = 0;
    } else {
      currentMonthIdx += 1;
    }
  };

  const prevMonth = () => {
    const tmpMonthIdx = currentMonthIdx - 1;

    if (tmpMonthIdx < 0) {
      currentYear -= 1;
      currentMonthIdx = NUM_MONTHS - 1;
    } else {
      currentMonthIdx -= 1;
    }
  };

  // Methods changing the current date (-1 for inter)

  $currentDate = { year: 2480, month: 0, day: 0 };
  // let currentDate = { year: 2480, intercalaryHoliday: intercalaryHolidayNames.MITTERFRUHL };

  const advanceByDays = days => {};
</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: var(--light-gray);
  }

  .scrub {
    border: none;
    background: none;
    padding: 1.5em 2em;
  }

  .monthYearDisplay {
    padding: 0.5em;
  }

  .monthName {
    font-size: 1.5em;
  }

  .yearNumber {
    background: none;
    border: none;
    font-size: 1.5em;
    width: 2.5em;
    text-decoration: underline;
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
  <nav>
    <button class="scrub" on:click={prevMonth}>
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
        bind:value={currentYear} />
    </div>
    <button class="scrub" on:click={nextMonth}>
      <RightArrow />
    </button>
  </nav>

  <Month month={currentMonth} />
</main>
