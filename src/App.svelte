<script>
  import Month from "./components/Month.svelte";
  import { getMonthsByYear } from "./util.js";

  let currentYear = 2480;

  $: currentYearMonths = getMonthsByYear(currentYear);
</script>

<style>
  .month {
    margin-bottom: 1em;
  }
</style>

<main>
  <input type="number" min={1000} step={1} bind:value={currentYear} />

  {#each currentYearMonths as month}
    <div class="month">
      {#if month.intercalaryHoliday}
        <p>{month.intercalaryHoliday.name}</p>
      {/if}
      <h2>{month.name}</h2>
      <Month days={month.numberOfDays} offset={month.weekdayOffset} />
    </div>
  {/each}
</main>
