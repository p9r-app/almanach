<script>
  import { createIntercalaryHoliday } from "../util.js";
  import { timeEntityTypes } from "../constants.js";
  import { currentDate, currentScrub } from "../stores.js";

  export let holiday;

  function handleClick() {
    $currentDate = {
      year: $currentScrub.year,
      ...createIntercalaryHoliday(holiday.name)
    };
  }

  $: active =
    $currentScrub.year === $currentDate.year &&
    $currentDate.entityType === timeEntityTypes.INTERCALARY_HOLIDAY &&
    holiday.name === $currentDate.day;
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
