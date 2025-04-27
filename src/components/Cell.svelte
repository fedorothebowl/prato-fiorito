<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let cell: {
    hasMine: boolean;
    adjacent: number;
    state: 'covered' | 'open' | 'flagged';
  };
  export let row: number;
  export let col: number;
  const dispatch = createEventDispatcher();

  function open() { dispatch('open', { row, col }); }
  function flag() { dispatch('flag', { row, col }); }
</script>

<div
  class="aspect-square flex items-center justify-center
         border border-gray-400 select-none transition-colors duration-200
         {cell.state === 'covered' ? 'bg-gray-300 hover:bg-gray-200' : ''}
         {cell.state === 'open'     ? 'bg-gray-100' : ''}
         {cell.state === 'flagged'  ? 'bg-red-200'  : ''}"
  on:click={open}
  on:contextmenu|preventDefault={flag}
>
  {#if cell.state === 'open'}
    {#if cell.hasMine}
      <span class="text-xl">💣</span>
    {:else}
      <span
        class="font-bold
               {cell.adjacent === 1 && 'text-blue-600'}
               {cell.adjacent === 2 && 'text-green-600'}
               {cell.adjacent >= 3 && 'text-red-600'}"
      >
        {cell.adjacent || ''}
      </span>
    {/if}
  {:else if cell.state === 'flagged'}
    <span class="text-xl">🚩</span>
  {/if}
</div>
