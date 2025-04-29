<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  export let totalMines = 10;
  export let flaggedCount = 0;
  export let peopleCount = 0;     // nuovo contatore

  export let gameEnded = false;

  const dispatch = createEventDispatcher();
  let time = 0;
  let timer: ReturnType<typeof setInterval>;

  function start() {
    clearInterval(timer);
    time = 0;
    timer = setInterval(() => {
      time += 1;
      dispatch('tick', time);
    }, 1000);
  }

  function reset() {
    dispatch('reset');
    start();
  }

  $: if (gameEnded) {
    clearInterval(timer);
  }

  onMount(start);
  onDestroy(() => clearInterval(timer));
</script>

<div class="flex flex-col gap-2 mb-4">
  <div class="flex items-center justify-between">
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      on:click={reset}
    >
      Reset
    </button>
    <div class="font-mono text-lg">⏱️ {time}s</div>
  </div>
  <div class="flex items-center justify-between font-mono text-lg">
    <span>Terrorism: {flaggedCount}</span>
    <span>Civilians: {peopleCount}</span>
  </div>
</div>
