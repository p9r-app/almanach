<script>
  export let days;
  export let offset;

  const ALIGNMENT = 32;
  const NUM_WEEKDAYS = 8;

  const preOffsetDays = [...Array(offset).keys()];

  const postOffsetDays = [
    ...Array(NUM_WEEKDAYS + ALIGNMENT - (offset + days)).keys()
  ];

  const fullDays = [...Array(days).keys()];

  const needsOffset = () => offset + days > ALIGNMENT;
</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(minmax(5, 6), 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column;
  }

  .day {
    display: block;
    border: 2px solid darkorange;
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
  {#if needsOffset()}
    {#each preOffsetDays as _}
      <div class="day">/</div>
    {/each}
  {/if}
  {#each fullDays as dayIdx}
    <div class="day">{dayIdx + 1}</div>
  {/each}
  {#if needsOffset()}
    {#each postOffsetDays as _}
      <div class="day">/</div>
    {/each}
  {/if}
</section>
