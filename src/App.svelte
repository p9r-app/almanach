<script>
  import Month from "./components/Month.svelte";
  import { getMonthsByYear } from "./util.js";

  const currentYear = 2481;

  const currentYearMonths = getMonthsByYear(currentYear);
</script>

<style>
  .month {
    margin-bottom: 1em;
  }
</style>

<main>
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
