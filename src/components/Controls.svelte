<script lang="ts">

  import { terrorism, people, time } from '../js/Store';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let gameEnded = false;

  const dispatch = createEventDispatcher();
  let timer: ReturnType<typeof setInterval>;

  function start() {
    clearInterval(timer);
    $time = 0;
    timer = setInterval(() => {
      $time += 1;
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

<div class="flex flex-col max-w-md w-full space-y-4">
  <!-- <div class="font-mono text-lg">⏱️ {$time}s</div> -->

  <button class="rounded-full px-6 py-2 shadow-xl bg-[#ffeac9] font-bold text-amber-900 cursor-pointer" on:click={reset}>Reset</button>
</div>
