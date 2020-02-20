<script>
  import { createMonth } from "../util.ts";
  import { TimeEntityKind, NUM_WEEKDAYS } from "../constants.ts";
  import { currentDate, currentScrub } from "../stores.js";

  export let month;

  $: numPreOffsetDays = month.weekdayOffset;

  $: numPostOffsetDays =
    (NUM_WEEKDAYS -
      ((month.weekdayOffset + month.numberOfDays) % NUM_WEEKDAYS)) %
    NUM_WEEKDAYS;

  $: fullDays = [...Array(month.numberOfDays).keys()].map(id => ({
    id,
    selected: isActive(id)
  }));

  const saveTheDate = day => () =>
    ($currentDate = {
      year: $currentScrub.year,
      ...createMonth($currentScrub.month, day)
    });

  $: isActive = day =>
    $currentScrub.year === $currentDate.year &&
    $currentDate.entityType === TimeEntityKind.MONTH &&
    $currentScrub.month === $currentDate.month &&
    day === $currentDate.day;
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
  {#each Array(numPreOffsetDays) as _}
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
  {#each Array(numPostOffsetDays) as _}
    <div class="cell" />
  {/each}
</section>
