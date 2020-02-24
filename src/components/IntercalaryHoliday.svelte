<script>
  import { DateState } from "../util.ts";
  import { TimeEntityKind, reverseRenderSlices } from "../constants.ts";
  import { currentDate, currentScrub } from "../stores.js";

  export let holiday;
  export let timeEntityIdx;

  function handleClick() {
    $currentDate = new DateState($currentScrub.year, timeEntityIdx);
  }

  $: active =
    $currentScrub.year === $currentDate.year &&
    $currentDate.currentTimeEntity().entityType ===
      TimeEntityKind.INTERCALARY_HOLIDAY &&
    $currentScrub.month === reverseRenderSlices[$currentDate.entityIdx];
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
    touch-action: manipulation;
  }

  .active {
    background: var(--selection-green);
  }
</style>

<button class:active on:click={handleClick}>{holiday.name}</button>
