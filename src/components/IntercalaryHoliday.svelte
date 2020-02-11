<script>
  import { createIntercalaryHoliday } from "../util.js";
  import { timeEntityTypes } from "../constants.js";
  import { currentDate } from "../stores.js";

  export let holiday;

  function handleClick() {
    $currentDate.date = {
      year: $currentDate.scrub.year,
      ...createIntercalaryHoliday(holiday.name)
    };
  }

  $: active =
    $currentDate.scrub.year === $currentDate.date.year &&
    $currentDate.date.entityType === timeEntityTypes.INTERCALARY_HOLIDAY &&
    holiday.name === $currentDate.date.day;
</script>

<style>
  button {
    display: block;
    background: var(--dark-gray);
    border: none;
    font-weight: bold;
    font-size: 1.25em;
    padding: 0.5em;
    width: 100%;
    text-align: center;
  }

  .active {
    background: var(--selection-green);
  }
</style>

<button class:active on:click={handleClick}>{holiday.name}</button>
