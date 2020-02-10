<script>
  import { NUM_WEEKDAYS } from "../util.js";

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

  .none {
    background: var(--black);
  }

  .label {
    text-align: left;
  }
</style>

{#if month.intercalaryHoliday}
  <p>{month.intercalaryHoliday.name}</p>
{/if}

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
    <div class="cell none" />
  {/each}
  {#each fullDays as dayIdx}
    <button class="cell day">{dayIdx + 1}</button>
  {/each}
  {#each postOffsetDays as _}
    <div class="cell none" />
  {/each}
</section>
