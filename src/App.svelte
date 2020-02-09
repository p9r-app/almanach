<script>
  import Month from "./components/Month.svelte";
  import { getMonthsByYear, NUM_MONTHS, NUM_WEEKDAYS } from "./util.js";

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

  let currentDay = { regular: 0, month: 0, year: 2480 };

  const advanceByDays = days => {};
</script>

<style>
  .month {
    margin-bottom: 1em;
  }
</style>

<main>
  <input type="number" min={1000} step={1} bind:value={currentYear} />
  <button class="prev" on:click={prevMonth}>Previous Month</button>
  <button class="next" on:click={nextMonth}>Next Month</button>

  <div class="month">
    <Month month={currentMonth} />
  </div>
</main>
