<script>
  import { NUM_WEEKDAYS } from "../util.js";

  export let days;
  export let offset;

  const ALIGNMENT = 32;

  $: preOffsetDays = [...Array(offset).keys()];

  $: postOffsetDays = [
    ...Array(
      (NUM_WEEKDAYS - ((offset + days) % NUM_WEEKDAYS)) % NUM_WEEKDAYS
    ).keys()
  ];

  $: fullDays = [...Array(days).keys()];
</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(minmax(5, 6), 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column;
    border: 1px solid darkorange;
  }

  .day {
    display: block;
    border: 1px solid darkorange;
  }
</style>

<section>
  <div class="day">Wellentag</div>
  <div class="day">Aubentag</div>
  <div class="day">Marktag</div>
  <div class="day">Backertag</div>
  <div class="day">Bezahltag</div>
  <div class="day">Konistag</div>
  <div class="day">Angestag</div>
  <div class="day">Festag</div>
  {#each preOffsetDays as _}
    <div class="day">/</div>
  {/each}
  {#each fullDays as dayIdx}
    <div class="day">{dayIdx + 1}</div>
  {/each}
  {#each postOffsetDays as _}
    <div class="day">/</div>
  {/each}
</section>
