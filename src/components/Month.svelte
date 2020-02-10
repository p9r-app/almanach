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

  $: fullDays = [...Array(month.numberOfDays).keys()];

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
</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(minmax(5, 6), 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column;
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

  .cell.active {
    background: var(--selection-green);
  }
</style>

<section>
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
  {#each fullDays as dayIdx}
    <button
      class="cell day"
      class:active={isActive(dayIdx)}
      on:click={saveTheDate(dayIdx)}>
      {dayIdx + 1}
    </button>
  {/each}
  {#each postOffsetDays as _}
    <div class="cell" />
  {/each}
</section>
