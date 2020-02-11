<script>
  import Month from "./components/Month.svelte";
  import LeftArrow from "./svgs/LeftArrow.svelte";
  import RightArrow from "./svgs/RightArrow.svelte";
  import { getMonthsByYear, NUM_MONTHS, NUM_WEEKDAYS } from "./util.js";
  import { currentDate } from "./stores.js";

  $: currentYearMonths = getMonthsByYear($currentDate.scrub.year);
  $: currentMonth = currentYearMonths[$currentDate.scrub.month];

  // Methods for month scrubbing

  const nextMonth = () => {
    const tmpMonthIdx = $currentDate.scrub.month + 1;

    if (tmpMonthIdx >= NUM_MONTHS) {
      $currentDate.scrub.year += 1;
      $currentDate.scrub.month = 0;
    } else {
      $currentDate.scrub.month += 1;
    }
  };

  const prevMonth = () => {
    const tmpMonthIdx = $currentDate.scrub.month - 1;

    if (tmpMonthIdx < 0) {
      $currentDate.scrub.year -= 1;
      $currentDate.scrub.month = NUM_MONTHS - 1;
    } else {
      $currentDate.scrub.month -= 1;
    }
  };

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
    flex-grow: 1;
  }

  .monthYearDisplay {
    flex-grow: 1;
    text-align: center;
    padding: 0.5em;
  }

  .monthName {
    font-size: 1.5em;
  }

  .yearNumber {
    background: none;
    border: none;
    font-size: 1.5em;
    width: 4.5ch;
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
        bind:value={$currentDate.scrub.year} />
    </div>
    <button class="scrub" on:click={nextMonth}>
      <RightArrow />
    </button>
  </nav>

  <Month month={currentMonth} />
</main>
