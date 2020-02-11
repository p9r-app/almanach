<script>
  import { NUM_WEEKDAYS } from "../util.js";
  import { currentDate } from "../stores.js";

  export let month;

  $: preOffsetDays = [...Array(month.weekdayOffset).keys()];

  $: postOffsetDays = [
    ...Array(
      (NUM_WEEKDAYS -
        ((month.weekdayOffset + month.numberOfDays) % NUM_WEEKDAYS)) %
        NUM_WEEKDAYS
    ).keys()
  ];

  $: fullDays = [...Array(month.numberOfDays).keys()].map(id => ({
    id,
    selected: isActive(id)
  }));

  const saveTheDate = day => () =>
    ($currentDate.date = {
      ...$currentDate.date,
      ...$currentDate.scrub,
      day: day
    });

  const isActive = day =>
    $currentDate.scrub.year === $currentDate.date.year &&
    $currentDate.scrub.month === $currentDate.date.month &&
    day === $currentDate.date.day;

  $: intercalaryHolidayActive =
    $currentDate.scrub.year === $currentDate.date.year &&
    $currentDate.scrub.month === $currentDate.date.month &&
    $currentDate.date.day === -1;
</script>

<style>
  .days-of-the-month {
    display: grid;
    grid-template-columns: repeat(minmax(5, 6), 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column;
  }

  .iholiday {
    display: block;
    background: var(--dark-gray);
    border: none;
    font-weight: bold;
    font-size: 1.25em;
    padding: 0.5em;
    width: 100%;
    text-align: center;
  }

  .cell {
    display: block;
    padding: 0.5em;
    font-size: 1.125em;
  }

  .cell:nth-child(odd) {
    background: var(--light-gray);
  }

  .cell:nth-child(even) {
    background: var(--dark-gray);
  }

  .day {
    background: none;
    border: none;
    text-align: center;
  }

  .label {
    text-align: left;
  }

  .cell.active,
  .iholiday.active {
    background: var(--selection-green);
  }
</style>

{#if month.intercalaryHoliday}
  <button
    class="iholiday"
    class:active={intercalaryHolidayActive}
    on:click={saveTheDate(-1)}>
    {month.intercalaryHoliday.name}
  </button>
{/if}

<section class="days-of-the-month">
  <div class="cell label">Wellentag</div>
  <div class="cell label">Aubentag</div>
  <div class="cell label">Marktag</div>
  <div class="cell label">Backertag</div>
  <div class="cell label">Bezahltag</div>
  <div class="cell label">Konistag</div>
  <div class="cell label">Angestag</div>
  <div class="cell label">Festag</div>
  {#each preOffsetDays as _}
    <div class="cell" />
  {/each}
  {#each fullDays as day}
    <button
      class="cell day"
      class:active={day.selected}
      on:click={saveTheDate(day.id)}>
      {day.id + 1}
    </button>
  {/each}
  {#each postOffsetDays as _}
    <div class="cell" />
  {/each}
</section>
