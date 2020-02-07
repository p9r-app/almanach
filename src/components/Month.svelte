<script>
  import calendarData from "../data/calendar.json";
</script>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(minmax(4, 5), 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column;
  }

  .day {
    display: block;
    border: 2px solid darkorange;
  }
</style>

<section>
  {#each calendarData as day, idx}
    <div class="day">{idx + 1}</div>
  {/each}
</section>
